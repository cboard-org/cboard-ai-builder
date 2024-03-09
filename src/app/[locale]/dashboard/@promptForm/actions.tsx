'use server';
//import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { toCboardAdapter } from '@/lib/cboard-ai-engine/cboard-adapter';
import { initEngine } from 'cboard-ai-engine';
import { type PictonizerConfiguration } from 'cboard-ai-engine';
const apiKey = process.env.AZURE_OPENAI_API_KEY;

const promptFormDataSchema = z.object({
  rows: z.coerce.number().int().min(1).max(12),
  columns: z.coerce.number().int().min(1).max(12),
  colorScheme: z.string().min(1),
  prompt: z.string().min(1),
  isAiPictogram: z.coerce.boolean(),
});

const openAIConfiguration = {
  apiKey,
  basePath: 'https://cboard-openai.openai.azure.com/openai/deployments/ToEdit',
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

const boardGenerator = initEngine({
  openAIConfiguration,
  pictonizerConfiguration,
});

export async function submit(
  prevState: {
    message: string;
  } | null,
  formData: FormData,
) {
  const prompt = formData.get('prompt-text'),
    rows = Number(formData.get('rows')),
    columns = Number(formData.get('columns')),
    colorScheme = formData.get('color-scheme'),
    isAiPictogram = formData.get('use-ai-pictogram');
  const validate = promptFormDataSchema.safeParse({
    rows: rows,
    columns: columns,
    colorScheme: colorScheme,
    prompt: prompt,
    isAiPictogram: isAiPictogram,
  });

  if (!validate.success) {
    console.log('validate', validate.error);
    return { message: 'Failed to create todo' };
  }
  if (
    typeof prompt === 'string' &&
    typeof rows === 'number' &&
    typeof columns === 'number'
  )
    try {
      const numberOfTiles = rows * columns;
      const suggestions =
        await boardGenerator.getSuggestionsAndProcessPictograms({
          prompt: prompt,
          maxSuggestions: numberOfTiles,
          symbolSet: 'arasaac',
          language: 'eng',
        });

      const generatedBoard = await toCboardAdapter({
        suggestions,
        columns,
        rows,
      });

      return {
        message: 'created board with success',
        boardData: generatedBoard,
      };
    } catch (error) {
      console.log('Error: ', error);
      return { message: 'Failed to create board' };
    }
  return { message: 'Failed to create board' };
}
