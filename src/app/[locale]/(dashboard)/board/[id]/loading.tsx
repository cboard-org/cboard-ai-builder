import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>LOADING...</p>
      </Box>
    </Box>
  );
}
