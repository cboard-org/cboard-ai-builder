import dbConnect from '@/lib/dbConnect';
import PromptModel from './model';
import { type PromptRecord } from '@/commonTypes/Prompt';
import { stringToObjectId } from '@/db/utils/helpers';
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
    deletedDate: null,
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

export async function getPromptHistoryList({ userId }: { userId: string }) {
  await dbConnect();
  const query = { userId, deletedDate: { $eq: null } };
  const sort: Record<string, SortOrder> = { createdDate: 'desc' };
  const promptHistoryList = await PromptModel.find(query)
    .sort(sort)
    .lean()
    .exec();

  return promptHistoryList;
}

export async function softDelete(userId: string, promptId: string) {
  await dbConnect();

  const parsedUserId = stringToObjectId(userId);
  if (!parsedUserId) throw new Error('Please provide a valid user id');
  const parsedPromptId = stringToObjectId(promptId);
  if (!parsedPromptId) throw new Error('Please provide a valid prompt id');

  const dbPrompt = await PromptModel.findOneAndUpdate(
    {
      _id: parsedPromptId,
      userId: parsedUserId,
    },
    { deletedDate: new Date() },
  ).exec();
  return !!dbPrompt;
}
