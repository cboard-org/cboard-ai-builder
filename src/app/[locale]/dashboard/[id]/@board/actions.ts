'use server';

import { BoardRecord } from '@/commonTypes/Board';
import { create, get, update } from '@/db/services/Board/service';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/next-auth/config';
import { Midjourney } from 'midjourney';

export const saveBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await create({ ...board, userId: session.cboard_user.id });

  return {
    ...savedBoard,
    id: savedBoard._id.toString(),
    promptId: savedBoard.promptId?.toString(),
  };
};

export const updateBoard = async (board: BoardRecord) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error('User not authenticated');
  }
  const savedBoard = await update(board);
  return savedBoard;
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
const client = new Midjourney({
  ServerId: <string>process.env.PICTO_SERVER_ID,
  ChannelId: <string>process.env.PICTO_CHANNEL_ID,
  SalaiToken: <string>process.env.PICTO_SALAI_TOKEN,
  Debug: false,
  Ws: true,
  MaxWait: 100000,
});

async function initClient() {
  await client.init();
}

initClient();

export async function createPicto(description: string) {
  const basePrompt =
    ' colored as a pictogram in arasaac style with transparent background --style 56xABarnXQy --version 5.2 --fast';

  //Generate the Midjourney image
  const Imagine = await client.Imagine(
    description + basePrompt,
    // (uri, progress) => {
    // console.log('loading', uri, 'progress', progress);
    //},
  );
  if (!Imagine) {
    console.error('Error generating AI image');
    throw new Error('Error generating AI image');
  }

  // Get id for the first image
  const U1CustomID = Imagine.options?.find((o) => o.label === 'U1')?.custom;
  if (!U1CustomID) {
    throw new Error('Error generating AI image');
  }

  // Upscale the first generated image
  const Upscale = await client.Custom({
    msgId: <string>Imagine.id,
    flags: Imagine.flags,
    customId: U1CustomID,
    //loading: (uri, progress) => {
    //console.log('loading', uri, 'progress', progress);
    //},
  });
  if (!Upscale) {
    console.error('Error upscaling the first generated image');
    throw new Error('Error upscaling the first generated image');
  }
  if (!Imagine.options)
    throw new Error('Error upscaling the first generated image');

  const changeImageIds = Imagine.options
    .splice(0, 4)
    .map((option) => option.custom);
  client.Close();
  return {
    url: Upscale.uri,
    id: Imagine.id,
    content: Upscale.content,
    progress: Upscale.progress,
    proxy_url: Upscale.proxy_url,
    changeImageIds: changeImageIds,
  };
}

export async function changePicto(imageId: string, changeImageId: string) {
  try {
    const Upscale = await client.Custom({
      msgId: imageId,
      flags: 0,
      customId: changeImageId,
      //loading: (uri, progress) => {
      //console.log("loading", uri, "progress", progress);
      //},
    });
    if (!Upscale) {
      console.error('Error upscaling the generated image');
      throw new Error('Error upscaling the generated image');
    }
    return {
      url: Upscale.uri,
      id: Upscale.id,
      content: Upscale.content,
      progress: Upscale.progress,
      proxy_url: Upscale.proxy_url,
      options: Upscale.options,
      flags: Upscale.flags,
    };
  } catch (err) {
    console.error('Error upscaling the generated image');
    throw new Error('Error upscaling the generated image');
  }
}
