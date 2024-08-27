import { BoardRecord } from '@/commonTypes/Board';

/**
 * Sign in a user with credentials
 * @throws Error on fetch error
 * @param board
 * @param credentials
 * @returns
 */
export async function saveTemporaryBoard(
  board: BoardRecord,
  credentials: Record<'email' | 'authToken', string>,
): Promise<Response> {
  const authToken = credentials.authToken;
  if (!authToken) {
    throw new Error('Need to be authenticated to perform this request');
  }

  const apiResponse = await fetch(
    `${process.env.CBOARD_API_URL!}board/temporary`,
    {
      method: 'POST',
      body: JSON.stringify(board),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  if (!apiResponse.ok) {
    console.error(
      `Board creation response: ${apiResponse.status} for account ${credentials.email}`,
    );
    throw new Error('Error exporting board');
  }

  return apiResponse;
}
