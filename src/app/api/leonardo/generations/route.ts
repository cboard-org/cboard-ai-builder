import { getErrorMessage } from '@/common/common';

const leoBaseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1/';

export async function POST(req: Request) {
  const { description } = await req.json();
  const basePrompt =
    'Create a simple and clear pictogram of ' +
    description +
    ' in the style of ARASAAC for AAC use. ' +
    description +
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
