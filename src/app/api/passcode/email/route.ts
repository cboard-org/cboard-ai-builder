import { getErrorMessage } from '@/common/common';
import { assignPasscodeToEmail } from '@/db/services/PassCode/service';

export async function PATCH(req: Request) {
  const { email } = await req.json();
  try {
    const data = await assignPasscodeToEmail(email);
    if (!data.success) return new Response(data.message, { status: 400 });
    return Response.json(data);
  } catch (error) {
    console.error('Error getting passcode for email. ', getErrorMessage(error));
    return new Response('Something went wrong', { status: 500 });
  }
}
