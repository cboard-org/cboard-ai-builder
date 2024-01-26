export type User = {
  google: {
    emails: Array<string>;
    photos: Array<unknown>;
    id: string;
    token: string;
    displayName: string;
    name: string;
    lastname: string;
    email: string;
  };
  facebook: {
    emails: Array<unknown>;
    photos: Array<unknown>;
  };
  apple: {
    emails: Array<unknown>;
    photos: Array<unknown>;
  };
  location: {
    country: string;
    countryCode: string;
    region: string;
    city: string;
  };
  name: string;
  role: string;
  provider: string;
  locale: string;
  birthdate: string;
  lastlogin: string;
  email: string;
  isFirstLogin: boolean;
  createdAt: string;
  updatedAt: string;
  communicators: Array<unknown>;
  boards: Array<unknown>;
  isAdmin: boolean;
  id: string;
  settings: {
    id: string;
  };
  subscriber: unknown;
  authToken: string;
};
