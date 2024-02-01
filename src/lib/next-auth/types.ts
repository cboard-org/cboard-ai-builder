import { User } from '@/lib/cboard-api/types';

export const PICK_KEYS = [
  'name',
  'role',
  'provider',
  'locale',
  'lastlogin',
  'email',
  'isFirstLogin',
  'isAdmin',
  'id',
  'authToken',
  'location',
] as const;
type Keys = (typeof PICK_KEYS)[number];

export type CboardUser = Pick<User, Keys>;
