import {
  LeonardoImage,
  LeonardoData,
  LeonardoRes,
} from '@/commonTypes/LeonardoRes';
import { getErrorMessage } from '@/common/common';

const leoBaseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1/';

export async function GET(
  req: Request,
  { params }: { params: { generationId: string } },
) {
  const generationId = params.generationId;

  const leoImg: LeonardoImage = {
    url: '',
    id: '',
  };

  const messageData: LeonardoData = {
    status: '',
    generated_images: [leoImg],
    modelId: '',
    id: '',
  };

  let msgResponse: LeonardoRes = {
    generations_by_pk: messageData,
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + process.env.LEONARDO_TOKEN);

  try {
    const response = await fetch(leoBaseUrl + 'generations/' + generationId, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();
    msgResponse = data;
  } catch (error) {
    console.error('Error messaging AI image. ', getErrorMessage(error));
    return new Response('Error messaging AI image', { status: 500 });
  }
  return Response.json(msgResponse);
}
