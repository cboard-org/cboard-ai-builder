'use server';

import { BoardRecord } from '@/commonTypes/Board';
import { create, get, update } from '@/db/services/Board/service';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';
import { TileRecord } from '@/commonTypes/Tile';

const midjBaseUrl: string = 'https://api.imaginepro.ai/api/v1/midjourney/';

export const saveBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await create({ ...board, userId: session.cboard_user.id });
  const { _id, ...newBoard } = savedBoard;

  return {
    ...newBoard,
    id: _id.toString(),
    promptId: savedBoard.promptId?.toString(),
  };
};

export const updateBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await update(board);
  const { _id, ...newBoard } = savedBoard;
  newBoard.id = _id.toString();
  if (typeof newBoard.createdAt !== 'string')
    newBoard.createdAt = newBoard.createdAt.toISOString();
  if (typeof newBoard.updatedAt !== 'string')
    newBoard.updatedAt = newBoard.updatedAt.toISOString();
  newBoard.promptId = board.promptId?.toString();

  return newBoard;
};

export const getBoard = async (id: string) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await get(id);
  if (!savedBoard) throw new Error('Board not found');
  const { _id, ...board } = savedBoard;
  board.id = _id.toString();
  if (typeof board.createdAt !== 'string')
    board.createdAt = board.createdAt.toISOString();
  if (typeof board.updatedAt !== 'string')
    board.updatedAt = board.updatedAt.toISOString();
  board.promptId = board.promptId?.toString();

  return board;
};

export async function createAIPicto(
  description: string,
): Promise<TileRecord['generatedPicto']> {
  const basePrompt =
    ' colored as a pictogram in arasaac style with transparent background --style 56xABarnXQy --version 5.2 --fast';

  //Generate the Midjourney image
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg5NTgsImVtYWlsIjoibWFydGluYmVkb3VyZXRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtYXJ0aW5iZWRvdXJldEBnbWFpbC5jb20iLCJpYXQiOjE3MTE1MDM3MjJ9.uxHVQtSSICjTJ7BKl3if_OC4vEKyIFM0IyDP_wRAE1Q',
  );

  let messageId: string = '';
  let imgDone: boolean = false;
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
    messageId = data.messageId;
    do {
      await delay(2000);
      try {
        const message = await fetch(midjBaseUrl + 'message/' + messageId, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          cache: 'no-store',
        });
        messageResponse = await message.json();
        if (messageResponse.status === 'DONE') {
          imgDone = true;
          messageId = messageResponse.messageId;
        }
      } catch (error) {
        imgDone = true;
        console.error('Error in message AI image:');
        throw new Error('Error in message AI image');
      }
    } while (imgDone === false);
  } catch (error) {
    console.error('Error generating AI image:');
    throw new Error('Error generating AI image');
  }

  //Upscale first image
  const buttonBody: string = JSON.stringify({
    messageId: messageId,
    button: 'U1',
  });
  try {
    const respo = await fetch(midjBaseUrl + 'button', {
      method: 'POST',
      headers: myHeaders,
      body: buttonBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const d = await respo.json();
    messageId = d.messageId;
    imgDone = false;
    do {
      await delay(2000);
      try {
        const message = await fetch(midjBaseUrl + 'message/' + messageId, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          cache: 'no-store',
        });
        messageResponse = await message.json();
        if (messageResponse.status === 'DONE') {
          imgDone = true;
        }
      } catch (error) {
        imgDone = true;
        console.error('Error in message AI image');
        throw new Error('Error in message AI image');
      }
    } while (imgDone === false);
  } catch (error) {
    console.error('Error upscaling AI image:');
    throw new Error('Error upscaling AI image');
  }

  return {
    url: messageResponse.uri,
    id: messageResponse.messageId,
    content: '',
    progress: messageResponse.progress.toString(),
    proxy_url: messageResponse.uri,
    changeImageIds: [],
  };
}

export async function changePicto(imageId: string, changeImageId: string) {
  console.log(imageId, changeImageId);
  try {
    //   const Upscale = await client.Custom({
    //     msgId: imageId,
    //     flags: 0,
    //     customId: changeImageId,
    //     //loading: (uri, progress) => {
    //     //console.log("loading", uri, "progress", progress);
    //     //},
    //   });
    //   if (!Upscale) {
    //     console.error('Error upscaling the generated image');
    //     throw new Error('Error upscaling the generated image');
    //   }
    //   return {
    //     url: Upscale.uri,
    //     id: Upscale.id,
    //     content: Upscale.content,
    //     progress: Upscale.progress,
    //     proxy_url: Upscale.proxy_url,
    //     options: Upscale.options,
    //     flags: Upscale.flags,
    //   };
    return {
      url: '',
      id: '',
      content: '',
      progress: '',
      proxy_url: '',
      options: [],
      flags: '',
    };
  } catch (err) {
    console.error('Error upscaling the generated image');
    throw new Error('Error upscaling the generated image');
  }
}
