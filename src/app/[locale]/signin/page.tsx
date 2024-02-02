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
          Hero
        </Box>
        <Box
          sx={{
            gridArea: 'sign-actions',
            background: { xs: PURPLE, sm: 'blue' },
            width: { sx: '100%' },
          }}
        >
          Sign-actions
        </Box>
      </Box>
    </Box>
  );
}
