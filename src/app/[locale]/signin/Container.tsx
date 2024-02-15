import Brand from '@/components/icons/Brand';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import OAuthButton from './OAuth/Button';
import { getProviders } from 'next-auth/react';
import { Link } from '@/navigation';
import Image from 'next/image';
import LoginContainer from '@/app/[locale]/signin/Login/Container';
import Alert from '@mui/material/Alert';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import { styles } from './styles';
import SvgIcon from '@mui/material/SvgIcon';

export default function Container({
  errorMessage,
  authProviders,
}: {
  errorMessage: string;
  authProviders: Awaited<ReturnType<typeof getProviders>>;
}): JSX.Element {
  const t = useTranslations('SignIn');
  const messages = useMessages();

  const oauthProviders = Object.values(authProviders || {}).filter(
    (p) => p.type === 'oauth',
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.grid}>
        <Box sx={styles.hero}>
          <Box sx={{ pl: '56px', pt: '62px' }}>
            <Stack direction={'row'} alignItems={'center'}>
              <SvgIcon sx={styles.brandIcon}>
                <Brand />
              </SvgIcon>

              <Typography sx={{ fontSize: '26px' }}>
                <Typography
                  component={'span'}
                  sx={{ fontWeight: 'bold', fontSize: '26px' }}
                >
                  {t('cboardAi')}
                </Typography>{' '}
                {t('cbuilder')}
              </Typography>
            </Stack>
            <Box
              sx={{
                pt: '81px',
              }}
            >
              <Stack
                direction={'row'}
                alignItems={'start'}
                gap={2}
                sx={{ pb: '32px' }}
              >
                <Typography variant="h2">{t('sloganTitle')}</Typography>
                <Chip label={t('ai')} variant="filled" sx={styles.chipAI} />
              </Stack>
              <Typography variant="h5">{t('sloganSubtitle')}</Typography>
            </Box>
          </Box>
          <Box>
            <Image
              priority={true}
              src="/images/boards-example.png"
              width={846}
              height={463}
              alt="Tiles"
              style={{ objectFit: 'contain' }}
              unoptimized // TODO fix this see https://github.com/vercel/next.js/issues/58248
            />
          </Box>
        </Box>
        <Box sx={styles.signActions}>
          <Box sx={styles.signActionsContainer}>
            <Box sx={{ display: { md: 'none' } }}>
              <Stack direction={'row'} alignItems={'center'}>
                <SvgIcon sx={styles.brandIconSmall}>
                  <Brand />
                </SvgIcon>
                <Typography sx={{ fontSize: '16px' }}>
                  <Typography
                    component={'span'}
                    sx={{ fontWeight: 'bold', fontSize: '16px' }}
                  >
                    {t('cboardAi')}
                  </Typography>{' '}
                  {t('cbuilder')}
                </Typography>
              </Stack>
            </Box>
            <Box sx={styles.welcomeTextContainer}>
              <Typography sx={styles.holaText}>{t('hola')}</Typography>
              <Typography sx={styles.welcomeText}>{t('welcome')}</Typography>
            </Box>

            <NextIntlClientProvider messages={pick(messages, 'SignIn')}>
              <LoginContainer />
            </NextIntlClientProvider>

            <Button fullWidth variant="contained" size="large">
              {t('signUpButton')}
            </Button>

            <Divider flexItem sx={styles.divider} variant="fullWidth" />

            {errorMessage && (
              <Alert sx={{ width: '100%' }} severity="error">
                {t('errorMessage')}
              </Alert>
            )}

            <NextIntlClientProvider messages={pick(messages, 'SignIn')}>
              {oauthProviders.map((provider) => (
                <OAuthButton key={provider.id} provider={provider} />
              ))}
            </NextIntlClientProvider>

            <Box sx={styles.bottomLinks}>
              <Link href={'#'}>{t('privacyPolicy')}</Link>
              <Link href={'#'}>{t('terms')}</Link>
              <Box sx={styles.bottomImage}>
                <Image
                  priority={true}
                  src="/images/boards-example-cut.png"
                  width={393}
                  height={127}
                  // fill
                  alt="Tiles"
                  style={{ objectFit: 'cover' }}
                  unoptimized // TODO fix this see https://github.com/vercel/next.js/issues/58248
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
