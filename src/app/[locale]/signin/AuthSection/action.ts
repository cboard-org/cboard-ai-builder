'use server';

export async function getCboardSignupURL() {
  const URL = `${process.env.CBOARD_APP_URL_!}login-signup`;
  return {
    URL,
  };
}
