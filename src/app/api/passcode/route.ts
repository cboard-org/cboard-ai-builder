import { getErrorMessage } from '@/common/common';
import { createPasscodes } from '@/db/services/PassCode/service';
import { validateBearerToken } from '../helpers';

export async function POST(req: Request) {
  if (!validateBearerToken())
    return new Response('Unauthorized', { status: 403 });

  try {
    const { source, quantity } = await req.json();
    if (!source) return new Response('Source is required', { status: 400 });
    const data = await createPasscodes(source, quantity);
    if (!data.success) return new Response(data.message, { status: 400 });
    return Response.json(data);
  } catch (error) {
    console.error('Error getting passcode for email. ', getErrorMessage(error));
    return new Response('Something went wrong', { status: 500 });
  }
}
