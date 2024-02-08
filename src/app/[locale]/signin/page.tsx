import { BrandIcon } from '@/components/icons/Brand';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Google from '@/components/icons/Google';
import SvgIcon from '@mui/material/SvgIcon';

const PURPLE = '#D6B2FF';
export default function Page(): JSX.Element {
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
              // w: '352px',
              mx: { sm: 20 },
              // background: 'red',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box alignSelf={'start'}>
              <Typography variant="h2">Hola!</Typography>
              <Typography>Te damos la bienvenida a AI Board Builder</Typography>
            </Box>

            <Button fullWidth variant="outlined" size="large">
              LOGIN
            </Button>

            <Button fullWidth variant="contained" size="large">
              SIGN UP
            </Button>

            <Divider
              flexItem
              sx={{ my: 2, borderColor: { xs: '#6D6D6D', sm: '#C9C9C9' } }}
              variant="fullWidth"
            />

            {/* <ButtonBase>Iniciar sesión con google</ButtonBase> */}

            <Button
              fullWidth
              variant="outlined"
              size="large"
              sx={{
                color: '#2B2B2B',
                fontWeight: 500,
                backgroundColor: '#FFFFFF',
                borderColor: '#0000003B',
                borderWidth: '1px',
                textTransform: 'initial',
                pr: '16px',
                py: '8px',
                '&:hover': {
                  borderColor: '#2B2B2B',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  borderRight: '1px #0000003B solid',
                  pr: '12px',
                  py: '3px',
                }}
              >
                <SvgIcon>
                  <Google />
                </SvgIcon>
              </Box>

              <Box sx={{ width: '100%', fontWeight: 500 }}>
                Iniciar sesión con google
              </Box>
              <SvgIcon sx={{ visibility: 'hidden' }}>
                <Google />
              </SvgIcon>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
