import { User } from '@/lib/cboard-api/types';

export const pickKeys = [
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
type Keys = (typeof pickKeys)[number];

export type CboardUser = Pick<User, Keys>;
