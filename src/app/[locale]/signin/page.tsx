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

const PURPLE = '#D6B2FF';
export default async function Page(): Promise<JSX.Element> {
  const oauthProviders = Object.values((await getProviders()) || {}).filter(
    (p) => p.type === 'oauth',
  );
  return (
    <Box
      sx={{
        background: { xs: PURPLE, sm: 'white' },
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
            sm: `"hero sign-actions"`,
          },
        }}
      >
        <Box
          sx={{
            gridArea: 'hero',
            background: PURPLE,
            borderRadius: '16px',
            height: '100%',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <BrandIcon sx={{ fontSize: 125 }} />
            <Typography>
              <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                Cboard Ai
              </Typography>{' '}
              CBuilder
            </Typography>
          </Stack>
          <Box>
            <Stack direction={'row'} alignItems={'start'}>
              <Typography variant="h2">Fast and intelligent</Typography>
              <Chip label="AI" variant="filled" size="small" />
            </Stack>
            <Typography variant="h5">
              Create Tile boards in a simple way, just by typing what you need.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            gridArea: 'sign-actions',
            background: { xs: PURPLE, sm: 'inherit' },
            width: { sx: '100%' },
          }}
        >
          <Box
            sx={{
              gap: 2,
              mx: { sm: 20 },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                alignSelf: { xs: 'center', sm: 'start' },
                textAlign: { xs: 'center', sm: 'inherit' },
              }}
            >
              <Typography variant="h2">Hola!</Typography>
              <Typography>Te damos la bienvenida a AI Board Builder</Typography>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
              size="large"
            >
              LOGIN
            </Button>

            <Button fullWidth variant="contained" size="large">
              SIGN UP
            </Button>

            <Divider
              flexItem
              sx={{ my: 4, borderColor: { xs: '#6D6D6D', sm: '#C9C9C9' } }}
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
                color: { sx: '#221152', sm: '#868686' },
                fontWeight: { sx: 500, sm: 400 },
              }}
            >
              <Link href={'#'}>Privacy policy</Link>
              <Link href={'#'}>Terms</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
