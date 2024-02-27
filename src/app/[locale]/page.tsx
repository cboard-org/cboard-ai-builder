import { redirect } from '@/navigation';

export default function Home() {
  redirect('/signin');
  return null;
}
