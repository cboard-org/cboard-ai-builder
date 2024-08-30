import { getErrorMessage } from '@/common/common';

const midjBaseUrl: string = 'https://api.imaginepro.ai/api/v1/midjourney/';

export async function GET(
  req: Request,
  { params }: { params: { messageId: string } },
) {
  const messageId = params.messageId;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.MYMIDJOURNEY_TOKEN);

  type Message = {
    status: string;
    uri: string;
    progress: number;
    messageId: string;
  };
  let messageResponse: Message = {
    status: '',
    uri: '',
    progress: 0,
    messageId: '',
  };
  try {
    const response = await fetch(midjBaseUrl + 'message/' + messageId, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();
    messageResponse = data;
  } catch (error) {
    console.error('Error messaging AI image. ', getErrorMessage(error));
    return new Response('Error messaging AI image', { status: 500 });
  }
  return Response.json(messageResponse);
}
