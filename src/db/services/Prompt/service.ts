import dbConnect from '@/lib/dbConnect';
import PromptModel from './model';
import { type PromptRecord } from '@/commonTypes/Prompt';
import { stringToObjectId } from '@/db/utils/helpers';

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
