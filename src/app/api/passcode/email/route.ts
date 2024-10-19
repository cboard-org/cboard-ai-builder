import { getErrorMessage } from '@/common/common';
import { assignPasscodeToEmail } from '@/db/services/PassCode/service';
import { validateBearerToken } from '../../helpers';

export async function PATCH(req: Request) {
  if (!validateBearerToken())
    return new Response('Unauthorized', { status: 403 });
  try {
    const { email } = await req.json();
    const data = await assignPasscodeToEmail(email);
    if (!data.success) return new Response(data.message, { status: 400 });
    return Response.json(data);
  } catch (error) {
    console.error('Error getting passcode for email. ', getErrorMessage(error));
    return new Response('Something went wrong', { status: 500 });
  }
}
