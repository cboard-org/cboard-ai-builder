import {
  LeonardoRes,
  LeonardoData,
  LeonardoImage,
} from '@/commonTypes/LeonardoRes';
import Error from 'next/error';
import { getErrorMessage } from '../../common/common';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function createAIPicto(description: string) {
  let imgDone: boolean = false;
  let tries: number = 0;

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

  try {
    // Imagine image
    const imagineBody: string = JSON.stringify({
      description: description,
    });
    const response = await fetch('/api/leonardo/generations', {
      method: 'POST',
      headers: myHeaders,
      body: imagineBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.error && data.code) {
      throw new Error(data.error);
    }

    do {
      await delay(1200);
      const message = await fetch(
        '/api/leonardo/generations/' + data.sdGenerationJob.generationId,
        {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          cache: 'no-store',
        },
      );
      msgResponse = await message.json();
      tries++;
      if (msgResponse.generations_by_pk.status === 'COMPLETE') {
        imgDone = true;
      }
    } while (imgDone === false && tries < 24);
    imgDone = false;
    tries = 0;
    const imgIds = msgResponse.generations_by_pk.generated_images.map(
      (img) => img.id,
    );

    return {
      url: msgResponse.generations_by_pk.generated_images[0].url,
      id: msgResponse.generations_by_pk.id,
      content: '',
      progress: '100',
      proxy_url: msgResponse.generations_by_pk.generated_images[0].url,
      changeImageIds: imgIds,
    };
  } catch (error) {
    imgDone = true;
    console.error('Error generating AI image. ', getErrorMessage(error));
  }
}

export async function changePicto(generationId: string, id: string) {
  console.log(id);

  let imgDone: boolean = false;
  let tries: number = 0;

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

  try {
    do {
      await delay(200);
      const message = await fetch('/api/leonardo/generations/' + generationId, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store',
      });
      msgResponse = await message.json();
      tries++;
      if (msgResponse.generations_by_pk.status === 'COMPLETE') {
        imgDone = true;
      }
    } while (imgDone === false && tries < 10);
    imgDone = false;
    tries = 0;
    const imgIds = msgResponse.generations_by_pk.generated_images.map(
      (img) => img.id,
    );

    return {
      url: msgResponse.generations_by_pk.generated_images[1].url,
      id: msgResponse.generations_by_pk.id,
      content: '',
      progress: '100',
      proxy_url: msgResponse.generations_by_pk.generated_images[0].url,
      changeImageIds: imgIds,
    };
  } catch (error) {
    console.error(
      'Error upscaling the generated image',
      getErrorMessage(error),
    );
  }
}
