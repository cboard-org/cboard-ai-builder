import { BrandIcon } from '@/components/icons/Brand';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import OAuthButton from './OAuthButton';
import { getProviders } from 'next-auth/react';
import { Link } from '@/navigation';
import Image from 'next/image';
import LoginButton from '@/app/[locale]/signin/Login/Button';
import authOptions from '@/lib/next-auth/config';
import { redirect } from '@/navigation';
import { getServerSession } from 'next-auth';
import { PURPLE, DEFAULT_CALLBACK_URL } from './constants';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element | unknown> {
  const session = await getServerSession(authOptions);
  if (session) {
    let callbackUrl = DEFAULT_CALLBACK_URL;
    if (
      'callbackUrl' in searchParams &&
      typeof searchParams['callbackUrl'] == 'string'
    ) {
      callbackUrl = searchParams['callbackUrl'];
    }
    redirect(callbackUrl);
    return;
  }

  const oauthProviders = Object.values((await getProviders()) || {}).filter(
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
                  Cboard Ai
                </Typography>{' '}
                CBuilder
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
                <Typography variant="h2">Fast and intelligent</Typography>
                <Chip
                  label="AI"
                  variant="filled"
                  // size="small"
                  sx={{ backgroundColor: '#363636', color: 'white' }}
                />
              </Stack>
              <Typography variant="h5">
                Create Tile boards in a simple way, just by typing what you
                need.
              </Typography>
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
            width: { sx: '100%' },
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
                    Cboard Ai
                  </Typography>{' '}
                  CBuilder
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
                ¡Hola!
              </Typography>
              <Typography sx={{ color: '#2B2B2B', fontSize: '16px' }}>
                Te damos la bienvenida a AI Board Builder
              </Typography>
            </Box>

            <LoginButton />

            <Button fullWidth variant="contained" size="large">
              SIGN UP
            </Button>

            <Divider
              flexItem
              sx={{ my: 4, borderColor: { xs: '#6D6D6D', md: '#C9C9C9' } }}
              variant="fullWidth"
            />
            {oauthProviders.map((provider) => (
              <OAuthButton key={provider.id} provider={provider} />
            ))}

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
              <Link href={'#'}>Privacy policy</Link>
              <Link href={'#'}>Terms</Link>
            </Box>
            {/* <Box sx={{ display: { md: 'none' }, width: '100%' }}>
              <Image
                priority={true}
                src="/images/boards-example-cut.png"
                width={430}
                height={133}
                alt="Tiles"
                style={{ objectFit: 'contain' }}
                unoptimized // TODO fix this see https://github.com/vercel/next.js/issues/58248
              />
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
