'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Login from '@/app/[locale]/signin/Login/Login';
import Alert from '@/components/Alert/Alert';
import OAuthButton from '@/app/[locale]/signin/OAuth/Button';
import { styles } from './styles';
import { useTranslations } from 'next-intl';
import { ClientSafeProvider } from 'next-auth/react';
import { useState } from 'react';
import PassCode from '../PassCode/PassCode';
import { getCboardSignupURL } from './action';

export default function AuthSection({
  errorMessage,
  oauthProviders,
}: {
  errorMessage: string;
  oauthProviders: ClientSafeProvider[];
}) {
  const t = useTranslations('SignIn');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const onSignUpClick = async () => {
    try {
      const { URL } = await getCboardSignupURL();
      return window.open(URL, '_blank');
    } catch (error) {
      return;
    }
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.welcomeTextContainer}>
        <Typography sx={styles.holaText}>{t('hello')}</Typography>
        <Typography sx={styles.welcomeText}>{t('welcome')}</Typography>
      </Box>
      {isAuthorized || errorMessage ? (
        <>
          <Login />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onSignUpClick}
            sx={styles.signUpButton}
          >
            {t('signUpButton')}
          </Button>

          <Divider flexItem sx={styles.divider} variant="fullWidth" />

          {errorMessage && <Alert messages={t('errorMessage')} />}

          {oauthProviders.map((provider) => (
            <OAuthButton key={provider.id} provider={provider} />
          ))}
        </>
      ) : (
        <PassCode setIsAuthorized={setIsAuthorized} />
      )}
    </Box>
  );
}
