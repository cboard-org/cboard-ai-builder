import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/common/common';
import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';

const detectorKey: string = process.env.LANGUAGE_KEY || '';
const detectorEndpoint: string =
  'https://cbuilder-language.cognitiveservices.azure.com';

export async function POST(req: Request) {
  const { description } = await req.json();

  try {
    const client = new TextAnalyticsClient(
      detectorEndpoint,
      new AzureKeyCredential(detectorKey),
    );

    const result = (await client.detectLanguage([description]))[0];
    if (!result.error)
      return NextResponse.json({
        language: result.primaryLanguage?.iso6391Name,
      });
    return NextResponse.json(
      { error: `Error detecting language for: ${description}` },
      { status: 500 },
    );
  } catch (error) {
    console.error(
      'Unable to detect language for: ' + description + '. ',
      getErrorMessage(error),
    );
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
