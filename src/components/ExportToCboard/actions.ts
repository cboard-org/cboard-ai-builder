'use server';

export async function generateURL(boardId: string) {
  const URL = `${process.env.CBOARD_APP_URL_!}board/${boardId}?cbuilder=true`;
  return {
    URL,
  };
}
