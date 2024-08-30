import { getErrorMessage } from '@/common/common';

const midjBaseUrl: string = 'https://api.imaginepro.ai/api/v1/midjourney/';

export async function POST(req: Request) {
  const { description } = await req.json();

  const basePrompt =
    ' colored as a pictogram in arasaac style with transparent background --style 56xABarnXQy --version 5.2 --fast';

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.MYMIDJOURNEY_TOKEN);

  // Imagine image
  const imagineBody: string = JSON.stringify({
    prompt: description + basePrompt,
  });
  try {
    const response = await fetch(midjBaseUrl + 'imagine', {
      method: 'POST',
      headers: myHeaders,
      body: imagineBody,
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
