import { getErrorMessage } from '@/common/common';
import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';
import TextTranslationClient, {
  TranslatorCredential,
  InputTextItem,
  isUnexpected,
} from '@azure-rest/ai-translation-text';

const translatorEndpoint: string =
  'https://api.cognitive.microsofttranslator.com';
const translatorApiKey: string = process.env.TEXT_TRANSLATOR_API_KEY || '';
const region: string = 'eastus';
const leoBaseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1/';
const detectorKey: string = process.env.LANGUAGE_KEY || '';
const detectorEndpoint: string =
  'https://cbuilder-language.cognitiveservices.azure.com/';

export async function POST(req: Request) {
  const { description } = await req.json();
  let desc = description;
  try {
    const client = new TextAnalyticsClient(
      detectorEndpoint,
      new AzureKeyCredential(detectorKey),
    );
    const result = (await client.detectLanguage([description]))[0];
    if (!result.error && result.primaryLanguage?.iso6391Name !== 'en') {
      const translateCedential: TranslatorCredential = {
        key: translatorApiKey,
        region,
      };
      const translationClient = TextTranslationClient(
        translatorEndpoint,
        translateCedential,
      );

      const inputText: InputTextItem[] = [{ text: description }];
      const translateResponse = await translationClient
        .path('/translate')
        .post({
          body: inputText,
          queryParameters: {
            to: 'en',
            from: result.primaryLanguage.iso6391Name,
          },
        });

      if (isUnexpected(translateResponse)) {
        console.error(translateResponse.body.error);
      } else {
        const translations = translateResponse.body;
        if (translations instanceof Array) {
          desc = translations[0].translations[0].text;
        }
      }
    }
  } catch (error) {
    console.error(
      'Unable to translate for: ' + description + '. ',
      getErrorMessage(error),
    );
  }
  const basePrompt =
    'Create a simple and clear pictogram of ' +
    desc +
    ' in the style of ARASAAC for AAC use. ' +
    desc +
    ' should be represented with basic shapes and minimal details, using bold lines and solid colors to ensure easy recognition and clarity.';

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.LEONARDO_TOKEN);

  // Imagine image
  const generationsBody: string = JSON.stringify({
    prompt: basePrompt,
    alchemy: false,
    num_images: 2,
    width: 1024,
    height: 768,
    modelId: '2067ae52-33fd-4a82-bb92-c2c55e7d2786', //"name": "AlbedoBase XL",
    transparency: 'foreground_only',
    elements: [
      {
        akUUID: 'ec024a37-6fab-41ba-bc03-ab29ae0b9b5a', //Simple Icons
        weight: 0.7,
      },
    ],
  });
  try {
    const response = await fetch(leoBaseUrl + 'generations', {
      method: 'POST',
      headers: myHeaders,
      body: generationsBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error generating AI image. ', getErrorMessage(error));
    return new Response('Error generating AI image', { status: 500 });
  }
}
