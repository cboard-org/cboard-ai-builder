'use server';
//import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { create } from '@/db/services/Board/service';
import testBoard from '@/app/[locale]/dashboard/@board/testBoard.json';
import { BoardRecord } from '../@board/types';

const promptFormDataSchema = z.object({
  rows: z.coerce.number().int().min(1).max(12),
  columns: z.coerce.number().int().min(1).max(12),
  colorScheme: z.string().min(1),
  prompt: z.string().min(1),
  isAiPictogram: z.coerce.boolean(),
});

export async function submit(
  prevState: {
    message: string;
  } | null,
  formData: FormData,
) {
  const validate = promptFormDataSchema.safeParse({
    rows: formData.get('rows'),
    columns: formData.get('columns'),
    colorScheme: formData.get('color-scheme'),
    prompt: formData.get('prompt-text'),
    isAiPictogram: formData.get('use-ai-pictogram'),
  });

  if (!validate.success) {
    console.log('validate', validate.error);
    return { message: 'Failed to create todo' };
  }

  // await fetch('https://postman-echo.com/delay/2', {
  //   cache: 'no-cache',
  // });
  try {
    const board: BoardRecord = testBoard[1];
    const response = await create(board);
    console.log('response', response);
  } catch (error) {
    console.error('error', error);
  }

  return { message: 'created board with success', boardData: testBoard[1] };
}
