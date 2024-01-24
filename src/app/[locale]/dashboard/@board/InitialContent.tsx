import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Image from 'next/image';

const promptExamples = [
  'A board encourages them to arrange these pictograms in a sequence to tell a magical and adventurous story.',
  'I Want a board that describe a family of a mother, son and grandmother and all social interactions between them.',
  'Mix and match pictograms to craft imaginative stories about animal adventures and friendships',
];

const PromptExamplesTextField = ({ prompt }: { prompt: string }) => {
  return (
    <TextField
      // id="prompt-text"
      // name="prompt-text"
      multiline
      rows={5}
      aria-readonly
      value={prompt}
      InputProps={{
        inputComponent: 'textarea',
        style: {
          fontSize: '0.8rem',
          color: 'black',
          backgroundColor: 'white',
        },
      }}
      sx={{
        backgroundColor: 'white',
        fontSize: '0.5rem',
        color: 'black',
        width: '100%',
      }}
    />
  );
};

export default function InitialContent() {
  return (
    <Box sx={{ height: '100%', backgroundColor: '#f8f8f8' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '1rem',
          height: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: grey,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '336px' } }}>
            <Box textAlign={'end'}>
              <Chip
                label={'AI'}
                sx={{ backgroundColor: '#363636', color: 'white' }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: '48px',
                textAlign: 'center',
                lineHeight: '56px',
              }}
            >
              {'Create a '}
              <Box component="span" fontWeight="bold">
                {'New'}
                <br /> {'Ai Board'}
              </Box>
            </Typography>
          </Box>
          <Box
            component={'div'}
            sx={{
              position: 'relative',
              width: '100%',
              height: '40%',
              mt: '1rem',
              mb: '1rem',
            }}
          >
            <Image
              priority={true}
              src="/images/tiles-example.png"
              fill
              alt="Tiles example"
              style={{ objectFit: 'contain' }}
              unoptimized // TDOD fix this see https://github.com/vercel/next.js/issues/58248
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ pb: '0.5rem' }}>
            <Typography>{'Examples'}</Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              pt: '1rem',
              overflowX: 'auto',
            }}
          >
            {promptExamples.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{ flexShrink: 0, flexGrow: 1, flexBasis: '188px' }}
                >
                  <PromptExamplesTextField prompt={item} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
