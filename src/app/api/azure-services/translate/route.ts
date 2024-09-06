import { getErrorMessage } from '@/common/common';
import TextTranslationClient, {
  TranslatorCredential,
  InputTextItem,
  isUnexpected,
} from '@azure-rest/ai-translation-text';
import { NextResponse } from 'next/server';

const translatorEndpoint: string =
  'https://api.cognitive.microsofttranslator.com';
const translatorApiKey: string = process.env.TEXT_TRANSLATOR_API_KEY || '';
const region: string = 'eastus';

export async function POST(req: Request) {
  const { description, from } = await req.json();

  try {
    const translateCedential: TranslatorCredential = {
      key: translatorApiKey,
      region,
    };
    const translationClient = TextTranslationClient(
      translatorEndpoint,
      translateCedential,
    );

    const inputText: InputTextItem[] = [{ text: description }];
    const translateResponse = await translationClient.path('/translate').post({
      body: inputText,
      queryParameters: {
        to: 'en',
        from: from,
      },
    });
    if (isUnexpected(translateResponse)) {
      console.error(translateResponse.body.error);
    } else {
      const translations = translateResponse.body;
      if (translations instanceof Array) {
        return NextResponse.json({
          translation: translations[0].translations[0].text,
        });
      }
    }
    return NextResponse.json(
      { error: `Error translating from: ${from} the word: ${description}.` },
      { status: 500 },
    );
  } catch (error) {
    console.error(
      'Unable to translate for: ' + description + '. ',
      getErrorMessage(error),
    );
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
