import Brand from '@/components/icons/Brand';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import OAuthButton from './OAuth/Button';
import { getProviders } from 'next-auth/react';
import InternalLink from '@/components/InternalLink/InternalLink';
import Image from 'next/image';
import Login from '@/app/[locale]/signin/Login/Login';
import Alert from '@/components/Alert/Alert';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import { styles } from './styles';
import SvgIcon from '@mui/material/SvgIcon';
import { BRAND_COLOR } from './constants';

export default function Signin({
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
    <NextIntlClientProvider messages={pick(messages, 'SignIn')}>
      <Box sx={styles.root}>
        <Box sx={styles.grid}>
          <Box sx={styles.hero}>
            <Box sx={styles.heroBranding}>
              <Stack direction={'row'} alignItems={'center'} sx={styles.brand}>
                <SvgIcon sx={styles.brandIcon}>
                  <Brand />
                </SvgIcon>

                <Typography fontWeight={300} fontSize={26} color={'#000000'}>
                  <Typography
                    component={'span'}
                    fontWeight={800}
                    fontSize={26}
                    color={'#000000'}
                    //sx={{ fontWeight: 'bold', fontSize: '26px' }}
                  >
                    {t('cboard')}
                  </Typography>{' '}
                  {t('builder')}
                </Typography>
              </Stack>
              <Box
                sx={styles.heroTextContainer}
                // sx={{
                //   pt: '81px',
                // }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'start'}
                  gap={2}
                  sx={{ width: 'max-content' }}
                >
                  <Typography
                    color={BRAND_COLOR}
                    fontWeight={700}
                    fontSize={{ md: 48, lg: 64 }}
                    variant="h2"
                    sx={{ width: 'max-content' }}
                  >
                    {t('sloganTitle')}
                  </Typography>
                  <Chip label={t('ai')} variant="filled" sx={styles.chipAI} />
                </Stack>
                <Typography
                  variant="body1"
                  fontWeight={300}
                  fontSize={{ md: 24, lg: 32 }}
                  lineHeight={'37.34px'}
                  color={BRAND_COLOR}
                >
                  {t('sloganSubtitle')}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 8 }}>
              <Image
                // priority={true}
                src="/images/boards-example.png"
                width={846}
                height={463}
                alt="Tiles"
                style={{ width: '100%', height: 'auto' }}

                //unoptimized // TODO fix this see https://github.com/vercel/next.js/issues/58248
              />
            </Box>
          </Box>
          <Box sx={styles.signActions}>
            <Box sx={styles.signActionsContainer}>
              <Box sx={styles.brandLogoXs}>
                <Stack direction={'row'} alignItems={'center'}>
                  <SvgIcon sx={styles.brandIconSmall}>
                    <Brand />
                  </SvgIcon>
                  <Typography fontSize={16} color={BRAND_COLOR}>
                    <Typography
                      component={'span'}
                      color={BRAND_COLOR}
                      fontSize={16}
                      fontWeight={800}
                    >
                      {t('cboard')}
                    </Typography>{' '}
                    {t('builder')}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={styles.mainContainer}>
                <Box sx={styles.welcomeTextContainer}>
                  <Typography sx={styles.holaText}>{t('hello')}</Typography>
                  <Typography sx={styles.welcomeText}>
                    {t('welcome')}
                  </Typography>
                </Box>

                <Login />

                <Button fullWidth variant="contained" size="large">
                  {t('signUpButton')}
                </Button>

                <Divider flexItem sx={styles.divider} variant="fullWidth" />

                {errorMessage && <Alert messages={t('errorMessage')} />}

                {oauthProviders.map((provider) => (
                  <OAuthButton key={provider.id} provider={provider} />
                ))}
              </Box>
              <Box sx={styles.bottomLinks}>
                <InternalLink href={'#'}>{t('privacyPolicy')}</InternalLink>
                <InternalLink href={'#'}>{t('terms')}</InternalLink>
              </Box>
            </Box>
            <Box sx={styles.bottomImage}>
              <Image
                priority={true}
                src="/images/boards-example-cut.png"
                width={393}
                height={127}
                // fill
                alt="Tiles"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                unoptimized // TODO fix this see https://github.com/vercel/next.js/issues/58248
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </NextIntlClientProvider>
  );
}
