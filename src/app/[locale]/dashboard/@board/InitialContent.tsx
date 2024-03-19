'use client';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import styles from './styles';
import { useBoundStore } from '@/providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';

const promptExampleMessagesKey = [
  {
    description: 'promptExample1',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: true,
  },
  {
    description: 'promptExample2',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: true,
  },
  {
    description: 'promptExample3',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: true,
  },
] as const;

const PromptExamplesTextField = ({
  promptValues,
}: {
  promptValues: PromptRecord;
}) => {
  const { setPrompt } = useBoundStore((state) => state);

  return (
    <Button
      sx={styles.exampleButton}
      onClick={() => {
        setPrompt(promptValues);
      }}
    >
      <TextField
        // id="prompt-text"
        // name="prompt-text"
        multiline
        rows={4}
        aria-readonly
        value={promptValues.description}
        InputProps={{
          inputComponent: 'textarea',
          readOnly: true,
          style: {
            width: '100%',
            color: 'black',
            backgroundColor: 'white',
            border: 'none',
          },
        }}
        sx={styles.textArea}
      />
    </Button>
  );
};

export default function InitialContent() {
  const messages = useTranslations('Board.InitialContent');
  return (
    <Box sx={{ height: '100%' }}>
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
                label={messages('ai')}
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
              {messages.rich('createANewBoard', {
                br: () => <br />,
                b: (children) => <b>{children}</b>,
              })}
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
            <Typography>{messages('examples')}</Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              py: '1rem',
              overflowX: 'auto',
            }}
          >
            {promptExampleMessagesKey.map((key, index) => {
              return (
                <Box
                  key={index}
                  sx={{ flexShrink: 0, flexGrow: 1, flexBasis: '250px' }}
                >
                  <PromptExamplesTextField
                    promptValues={{
                      ...key,
                      description: messages(key.description),
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
