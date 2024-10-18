import { getErrorMessage } from '@/common/common';
import { createPasscodes } from '@/db/services/PassCode/service';
// import { headers } from 'next/headers';

export async function POST(req: Request) {
  //   console.log('req', req.body);
  //   const headersList = headers();
  //   const token = headersList.get('Authorization')?.split(' ')[1] || '';

  //   if (token !== process.env.INTERNAL_API_KEY) {
  //     return Response.json({ error: 'Unauthorized' }, { status: 403 });
  //   }
  try {
    const { source } = await req.json();
    if (!source) return new Response('Source is required', { status: 400 });
    const data = await createPasscodes(source);
    if (!data.success) return new Response(data.message, { status: 400 });
    return Response.json(data);
  } catch (error) {
    console.error('Error getting passcode for email. ', getErrorMessage(error));
    return new Response('Something went wrong', { status: 500 });
  }
}
