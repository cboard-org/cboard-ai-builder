'use server';
import { revalidateTag } from 'next/cache';

export async function revalidateCachedTags() {
  revalidateTag('board');
  revalidateTag('savedBoards');
  revalidateTag('promptHistory');
}
