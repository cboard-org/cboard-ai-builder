import mongoose, { Schema } from 'mongoose';

export type PasscodeRecord = {
  code: string;
  email: string | null;
  isUsed: boolean;
  source: string;
  createdAt: Date;
};

const passcodeSchema = new Schema<PasscodeRecord>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: null,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Passcode: mongoose.Model<PasscodeRecord> =
  mongoose.models.Passcode ||
  mongoose.model<PasscodeRecord>('Passcode', passcodeSchema);

export default Passcode;
