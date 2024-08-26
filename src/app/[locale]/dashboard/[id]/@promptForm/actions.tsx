'use server';
import { z } from 'zod';
import { toCboardAdapter } from '@/lib/cboard-ai-engine/cboard-adapter';
import { initEngine } from 'cboard-ai-engine';
import {
  type PictonizerConfiguration,
  type ContentSafetyConfiguration,
} from 'cboard-ai-engine';
import { BoardRecord } from '@/commonTypes/Board';
import { getServerSession } from 'next-auth/next';
import authConfig from '@/lib/next-auth/config';
import { create as savePrompt } from '@/db/services/Prompt/service';
import { revalidatePath } from 'next/cache';

const apiKey = process.env.AZURE_OPENAI_API_KEY;

const promptFormDataSchema = z.object({
  rows: z.coerce.number().int().min(1).max(12),
  columns: z.coerce.number().int().min(1).max(12),
  colorScheme: z.string().min(1),
  prompt: z.string().min(1),
  isAiPictogram: z.coerce.boolean(),
  locale: z.string().min(1),
});

const openAIConfiguration = {
  apiKey,
  basePath:
    'https://cboard-openai.openai.azure.com/openai/deployments/ToEdit-01',
  baseOptions: {
    headers: { 'api-key': apiKey },
    params: {
      'api-version': '2022-12-01',
    },
  },
};

const pictonizerConfiguration = {
  URL: process.env.PICTONIZER_URL,
  token: process.env.PICTONIZER_AUTH_TOKEN,
  keyWords: 'arasaac pictograms',
} as PictonizerConfiguration;

const contentSafetyConfiguration = {
  endpoint: process.env.CONTENT_SAFETY_ENDPOINT,
  key: process.env.CONTENT_SAFETY_KEY,
} as ContentSafetyConfiguration;

const boardGenerator = initEngine({
  openAIConfiguration,
  pictonizerConfiguration,
  contentSafetyConfiguration,
});

function convertLocaletoIso639_3(locale: string) {
  const iso639_1to3: { [key: string]: string } = {
    en: 'eng',
    es: 'spa',
    pt: 'por',
  };
  const iso639_1 = locale.split('-')[0];

  return iso639_1to3[iso639_1] || 'eng';
}

export async function submit(
  prevState: {
    error?: { message: string };
    board?: BoardRecord;
  } | null,
  formData: FormData,
): Promise<{
  error?: { message: string };
  board?: BoardRecord;
}> {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }

  const prompt = formData.get('prompt-text'),
    rows = Number(formData.get('rows')),
    columns = Number(formData.get('columns')),
    colorScheme = formData.get('color-scheme'),
    isAiPictogram = formData.get('use-ai-pictograms'),
    locale = formData.get('locale');

  const validate = promptFormDataSchema.safeParse({
    rows: rows,
    columns: columns,
    colorScheme: colorScheme,
    prompt: prompt,
    isAiPictogram: isAiPictogram,
    locale: locale,
  });
  const ERROR_RESPONSE_OBJECT = {
    message: 'Failed to create board',
  };

  try {
    if (!validate.success) {
      console.log('validate', validate.error);
      throw Error('Invalid input');
    }
    if (
      typeof prompt === 'string' &&
      typeof rows === 'number' &&
      typeof columns === 'number' &&
      typeof locale === 'string'
    ) {
      const isContentSafe = await boardGenerator.isContentSafe(prompt);
      if (!isContentSafe) {
        throw new Error('Prompt is not safe');
      }

      const numberOfTiles = rows * columns;

      const language = convertLocaletoIso639_3(locale);

      const suggestions = await boardGenerator.getSuggestions({
        prompt: prompt,
        maxSuggestions: numberOfTiles,
        symbolSet: 'arasaac',
        language: language,
      });

      if (!suggestions.length) {
        throw new Error('No suggestions found');
      }

      const generatedBoard = await toCboardAdapter({
        suggestions,
        columns,
        rows,
        prompt,
        session,
        locale,
      });

      const savedPrompt = await savePrompt({
        userId: session.cboard_user.id,
        prompt: {
          rows: validate.data.rows,
          columns: validate.data.columns,
          colorScheme: 'fitzgerald', // TODO: remove this hardcode
          description: validate.data.prompt,
          shouldUsePictonizer: validate.data.isAiPictogram,
        },
      });

      if (savedPrompt) generatedBoard.promptId = savedPrompt._id.toString();

      revalidatePath('/');

      return {
        board: generatedBoard,
      };
    }
  } catch (error) {
    console.error('Error: ', error);
    //could return a more specific error also re try the request
    //return { error: ERROR_RESPONSE_OBJECT };
  }
  return { error: ERROR_RESPONSE_OBJECT };
}
