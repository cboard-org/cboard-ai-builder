import { headers } from 'next/headers';
import { get as getBoard } from '@/db/services/Board/service';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const headersList = headers();
  const token = headersList.get('Authorization')?.split(' ')[1] || '';

  const boardId = params.id;

  if (token !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  if (typeof boardId !== 'string') {
    return NextResponse.json({ error: 'Invalid board ID' }, { status: 400 });
  }

  try {
    const result = await getBoard(boardId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: 'Error fetching board' },
      { status: 500 },
    );
  }
}
