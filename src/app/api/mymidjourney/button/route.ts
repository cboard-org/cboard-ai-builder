import { getErrorMessage } from '@/common/common';

const midjBaseUrl: string = 'https://api.imaginepro.ai/api/v1/midjourney/';

export async function POST(req: Request) {
  const { messageId, button } = await req.json();

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.MYMIDJOURNEY_TOKEN);

  //Upscale image
  const buttonBody: string = JSON.stringify({
    messageId: messageId,
    button: button,
  });
  try {
    const response = await fetch(midjBaseUrl + 'button', {
      method: 'POST',
      headers: myHeaders,
      body: buttonBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error upscaling AI image. ', getErrorMessage(error));
    return new Response('Error upscaling AI image', { status: 500 });
  }
}
