'use server';
import { z } from 'zod';
import { verifyPasscode } from '@/db/services/PassCode/service';

const schema = z.object({
  email: z.string().email(),
  code: z.string({ message: 'Not valid code' }).min(6).max(6),
});

export default async function validateCode(
  prevState: {
    isAuthorized: boolean;
    errorMessage: string;
    error: boolean;
  },
  formData: FormData,
) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    code: formData.get('code'),
  });
  if (!validatedFields.success) {
    return {
      isAuthorized: false,
      //   errorMessage: validatedFields.error.flatten().fieldErrors,
      errorMessage: 'Not valid code or email',
      error: true,
    };
  }
  const response = await verifyPasscode(
    validatedFields.data.code,
    validatedFields.data.email,
  );
  if (!response.success) {
    return {
      isAuthorized: false,
      errorMessage: response.message,
      error: true,
    };
  }
  return {
    isAuthorized: true,
    errorMessage: '',
    error: false,
  };
}
