import { BrandIcon } from '@/components/icons/Brand';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
              w: '352px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h2">Hola!</Typography>
              <Typography>Te damos la bienvenida a AI Board Builder</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
