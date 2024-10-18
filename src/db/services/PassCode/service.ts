import Passcode from './model';
import dbConnect from '@/lib/dbConnect';
import { nanoid } from 'nanoid';

export async function createPasscode(
  source: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    await Passcode.create({
      code: nanoid(6).toUpperCase(),
      isUsed: false,
      email: null,
      source: source,
    });
    return { success: true, message: 'Passcode created successfully.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'An error occurred.' };
  }
}

export async function verifyPasscode(
  code: string,
  email: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    const passcodeEntry = await Passcode.findOne({
      code,
    });

    if (!passcodeEntry) {
      return { success: false, message: 'Passcode not found.' };
    }

    if (passcodeEntry.isUsed) {
      if (passcodeEntry.email === email) {
        return { success: true, message: 'Access granted.' };
      } else {
        return {
          success: false,
          message: 'Access denied. Email does not match.',
        };
      }
    }
    return { success: false, message: 'Passcode or email incorrect.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'An error occurred.' };
  }
}

export async function assignPasscodeToEmail(email: string) {
  try {
    await dbConnect();

    const existingPasscode = await Passcode.findOne({ email }).lean();
    if (existingPasscode) {
      return {
        success: false,
        message: 'Email already has an assigned passcode.',
      };
    }

    const availablePasscode = await Passcode.findOne({ isUsed: false });
    if (!availablePasscode) {
      return { success: false, message: 'No available passcodes.' };
    }

    availablePasscode.email = email;
    availablePasscode.isUsed = true;
    await availablePasscode.save();

    return {
      success: true,
      message: 'Email assigned to passcode successfully.',
      code: availablePasscode.code,
      email: availablePasscode.email,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred.',
    };
  }
}