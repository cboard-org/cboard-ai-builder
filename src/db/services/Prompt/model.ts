import mongoose, { Schema } from 'mongoose';
import { type Prompt as PromptRecord } from '@/app/[locale]/dashboard/types';

export type DbPromptRecord = PromptRecord & {
  userId: string;
  createdDate: Date;
};

const PromptSchema = new Schema<DbPromptRecord>({
  userId: {
    type: String,
    index: true,
    required: [true, 'Please provide an userId for this Prompt.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this Prompt.'],
  },
  rows: { type: Number, required: [true, 'Please provide a number of rows.'] },
  columns: {
    type: Number,
    required: [true, 'Please provide a number of columns.'],
  },
  shouldUsePictonizer: {
    type: Boolean,
    required: [true, 'Please provide a boolean value for shouldUsePictonizer.'],
  },
  colorScheme: { type: String },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Prompt: mongoose.Model<DbPromptRecord> =
  mongoose.models.Prompt ||
  mongoose.model<DbPromptRecord>('Prompt', PromptSchema);
export default Prompt;
