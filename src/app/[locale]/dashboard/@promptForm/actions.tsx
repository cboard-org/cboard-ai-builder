'use server';

//import { revalidatePath } from 'next/cache';
// import { z } from 'zod';

export async function submit(
  prevState: {
    message: string;
  } | null,
  formData: FormData,
) {
  console.log('createTodo', formData);
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  return { message: 'createTodo' };
  //   const schema = z.object({
  //     todo: z.string().min(1),
  //   });
  //   const parse = schema.safeParse({
  //     todo: formData.get('todo'),
  //   });

  //   if (!parse.success) {
  //     return { message: 'Failed to create todo' };
  //   }

  //   const data = parse.data;

  //   try {
  //     await sql`
  //       INSERT INTO todos (text)
  //       VALUES (${data.todo})
  //     `;

  //     revalidatePath('/');
  //     return { message: `Added todo ${data.todo}` };
  //   } catch (e) {
  //     return { message: 'Failed to create todo' };
  //   }
}
