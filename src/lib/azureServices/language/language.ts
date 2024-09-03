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
const detectorKey: string = process.env.LANGUAGE_KEY || '';
const detectorEndpoint: string =
  'https://cbuilder-language.cognitiveservices.azure.com/';

export const detectLanguage = async (description: string) => {
  try {
    const client = new TextAnalyticsClient(
      detectorEndpoint,
      new AzureKeyCredential(detectorKey),
    );
    const result = (await client.detectLanguage([description]))[0];
    if (!result.error) return result.primaryLanguage?.iso6391Name;
    return new Error('Error detecting language for: ' + description);
  } catch (error) {
    console.error(
      'Unable to detect language for: ' + description + '. ',
      getErrorMessage(error),
    );
  }
};

export const translateToEnglish = async (description: string, from: string) => {
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
        return translations[0].translations[0].text;
      }
    }
    return new Error('Unable to translate for: ' + description + '. ');
  } catch (error) {
    console.error(
      'Unable to translate for: ' + description + '. ',
      getErrorMessage(error),
    );
  }
};
