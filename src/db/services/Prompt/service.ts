import dbConnect from '@/lib/dbConnect';
import PromptModel, { DbPromptRecord } from './model';
import { type PromptRecord } from '@/commonTypes/Prompt';
import { stringToObjectId } from '@/db/utils/helpers';
import paginationResponse from '@/db/utils/pagination';
import { SortOrder } from 'mongoose';

export async function create({
  userId,
  prompt,
}: {
  userId: string;
  prompt: PromptRecord;
}) {
  await dbConnect();

  const dbPrompt = new PromptModel({
    userId: userId,
    createdDate: new Date(),
    ...prompt,
  });

  const newPrompt = await dbPrompt.save();

  return newPrompt.toJSON();
}

export async function get(id: string) {
  await dbConnect();

  const parsedId = stringToObjectId(id);
  if (!parsedId) throw new Error('Please provide a valid prompt id');

  const dbPrompt = await PromptModel.findById(parsedId).lean().exec();
  if (dbPrompt) return dbPrompt;

  return null;
}

export async function getPromptHistoryList({
  userId,
  actualPage,
  limitPages,
  itemsPerPage,
}: {
  userId: string;
  actualPage: number;
  limitPages: number;
  itemsPerPage: number;
}) {
  await dbConnect();
  const query = { userId };
  const sort: Record<string, SortOrder> = { createdDate: 'desc' };
  const promptHistoryList = await paginationResponse<DbPromptRecord>(
    PromptModel,
    {
      query,
      sort,
      actualPage,
      limitPages,
      itemsPerPage,
    },
  );
  const promptHistoryListToJSON = {
    ...promptHistoryList,
    data: promptHistoryList.data.map((prompt) => prompt.toJSON()),
  };
  return promptHistoryListToJSON;
}
