const midjBaseUrl: string = 'https://api.apiframe.pro/';

export async function POST(req: Request) {
  const { task_id } = await req.json();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `${process.env.APIFRAME_TOKEN}`);

  type Message = {
    task_id: string;
    task_type: string;
    status: string;
    percentage: string;
  };
  type SuccessMessage = {
    task_id: string;
    sref?: string;
    task_type: string;
    original_image_url: string;
    image_urls: string[];
  };

  type MessageResponse = Message | SuccessMessage;

  let messageResponse: MessageResponse = {
    task_id: '',
    task_type: 'imagine',
    original_image_url: '',
    image_urls: [],
  };
  try {
    const body = { task_id };
    const response = await fetch(midjBaseUrl + 'fetch/', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    messageResponse = data;
  } catch (error) {
    console.error('Error messaging AI image', error);
    return new Response('Error messaging AI image', { status: 500 });
  }
  return Response.json(messageResponse);
}
