import { redirect } from '@/navigation';
import { DEFAULT_CALLBACK_URL } from '../signin/constants';

export default function page() {
  redirect(DEFAULT_CALLBACK_URL);
  return null;
}
