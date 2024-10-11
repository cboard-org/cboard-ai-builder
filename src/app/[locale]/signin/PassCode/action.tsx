import { z } from 'zod';

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

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      isAuthorized: false,
      //   errorMessage: validatedFields.error.flatten().fieldErrors,
      errorMessage: 'Not valid code or email',
      error: true,
    };
  }

  return {
    isAuthorized: true,
    errorMessage: '',
    error: false,
  };

  // Mutate data
}
