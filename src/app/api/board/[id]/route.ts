import { headers } from 'next/headers';
import { get as getBoard } from '@/db/services/Board/service';
import { NextResponse } from 'next/server';

const API_KEY = 'YOUR_API';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const headersList = headers();
  const apiKey = headersList.get('x-api-key');
  const boardId = params.id;

  if (apiKey !== API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 500 });
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
