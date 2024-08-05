const midjBaseUrl: string = 'https://api.imaginepro.ai/api/v1/midjourney/';

export async function GET(
  req: Request,
  { params }: { params: { messageId: string } },
) {
  const messageId = params.messageId;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.MYMIDJOURNEY_TOKEN);

  let imgDone: boolean = false;
  let tries: number = 0;
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
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  do {
    await delay(2000);
    try {
      const response = await fetch(midjBaseUrl + 'message/' + messageId, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store',
      });
      const data = await response.json();
      messageResponse = data;
      tries++;
      if (messageResponse.status === 'DONE') {
        imgDone = true;
      }
    } catch (error) {
      imgDone = true;
      console.error('Error messaging AI image');
      return new Response('Error messaging AI image', { status: 500 });
    }
  } while (imgDone === false && tries < 40);
  return Response.json(messageResponse);
}
