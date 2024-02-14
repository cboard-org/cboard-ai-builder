import { BrandIcon } from '@/components/icons/Brand';
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
import { PURPLE } from './constants';
import Alert from '@mui/material/Alert';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';

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
    <Box
      sx={{
        background: { xs: PURPLE, md: 'white' },
        width: '100%',
        height: '100%',
        px: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          gridTemplateAreas: {
            xs: `"sign-actions"
            "hero"`,
            md: `"hero sign-actions"`,
          },
        }}
      >
        <Box
          sx={{
            gridArea: 'hero',
            background: PURPLE,
            borderRadius: '16px',
            height: '100%',
            maxWidth: { md: '846px' },
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box sx={{ pl: '56px', pt: '62px' }}>
            <Stack direction={'row'} alignItems={'center'}>
              <BrandIcon sx={{ fontSize: '50px', height: '52px', pr: '7px' }} />
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
                <Chip
                  label={t('ai')}
                  variant="filled"
                  // size="small"
                  sx={{ backgroundColor: '#363636', color: 'white' }}
                />
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
        <Box
          sx={{
            gridArea: 'sign-actions',
            background: { xs: PURPLE, md: 'inherit' },
            width: { xs: '100%' },
          }}
        >
          <Box
            sx={{
              gap: 2,
              mx: { md: 20 },
              maxWidth: { xs: 'inherit', md: '352px' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: { md: 'none' } }}>
              <Stack direction={'row'} alignItems={'center'}>
                <BrandIcon
                  sx={{ fontSize: '34px', height: '25px', pr: '7px' }}
                />
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
            <Box
              sx={{
                alignSelf: { xs: 'center', md: 'start' },
                textAlign: { xs: 'center', md: 'inherit' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '32px', md: '48px' },
                  color: '#181717',
                  pb: '16px',
                }}
              >
                {t('hola')}
              </Typography>
              <Typography sx={{ color: '#2B2B2B', fontSize: '16px' }}>
                {t('welcome')}
              </Typography>
            </Box>

            <NextIntlClientProvider messages={pick(messages, 'SignIn')}>
              <LoginContainer />
            </NextIntlClientProvider>

            <Button fullWidth variant="contained" size="large">
              {t('signUpButton')}
            </Button>

            <Divider
              flexItem
              sx={{ my: 4, borderColor: { xs: '#6D6D6D', md: '#C9C9C9' } }}
              variant="fullWidth"
            />

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

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                color: { xs: '#221152', md: '#868686' },
                fontWeight: { xs: 500, sm: 400 },
                fontSize: { xs: '12px', md: '16px' },
              }}
            >
              <Link href={'#'}>{t('privacyPolicy')}</Link>
              <Link href={'#'}>{t('terms')}</Link>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  display: { md: 'none' },
                }}
              >
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
