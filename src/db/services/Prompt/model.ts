import mongoose, { Schema } from 'mongoose';
import { PromptRecord } from '@/commonTypes/Prompt';

export type DbPromptRecord = PromptRecord & {
  userId: string;
  createdDate: Date;
  deletedDate: Date | null;
};

const PromptSchema = new Schema<DbPromptRecord>({
  userId: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rows: { type: Number, required: true },
  columns: {
    type: Number,
    required: true,
  },
  shouldUsePictonizer: {
    type: Boolean,
    required: true,
  },
  colorScheme: { type: String },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  deletedDate: {
    type: Date,
    default: null,
  },
});

const Prompt: mongoose.Model<DbPromptRecord> =
  mongoose.models.Prompt ||
  mongoose.model<DbPromptRecord>('Prompt', PromptSchema);
export default Prompt;
