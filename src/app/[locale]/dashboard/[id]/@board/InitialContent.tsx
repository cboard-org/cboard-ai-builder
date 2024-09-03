'use client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import styles from './styles';
import { useBoundStore } from '@/providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Brand from '@/components/icons/Brand';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const promptExampleMessagesKey = [
  {
    description: 'promptExample1',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: false,
  },
  {
    description: 'promptExample2',
    columns: 5,
    rows: 6,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: false,
  },
  {
    description: 'promptExample3',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: false,
  },
  {
    description: 'promptExample4',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: false,
  },
  {
    description: 'promptExample5',
    columns: 5,
    rows: 5,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: false,
  },
  {
    description: 'promptExample6',
    columns: 5,
    rows: 4,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: false,
  },
] as const;

const PromptExamplesTextField = ({
  promptValues,
}: {
  promptValues: PromptRecord;
}) => {
  const setPrompt = useBoundStore(useShallow((state) => state.setPrompt));

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
        rows={1}
        aria-readonly
        value={promptValues.description}
        InputProps={{
          inputComponent: 'textarea',
          readOnly: true,
          style: {
            width: '100%',
            border: 'none',
            fontSize: '15px',
            textAlignLast: 'center',
            borderRadius: 24,
          },
        }}
        sx={styles.textArea}
      />
    </Button>
  );
};

export default function InitialContent({
  newBoard = false,
}: {
  newBoard?: boolean;
}) {
  const messages = useTranslations('Board.InitialContent');
  const [
    isGenerationPending,
    errorOnBoardGeneration,
    setGenerationPending,
    cleanBoard,
  ] = useBoundStore(
    useShallow((state) => [
      state.isGenerationPending,
      state.errorOnBoardGeneration,
      state.setGenerationPending,
      state.cleanBoard,
    ]),
  );

  useEffect(() => {
    if (newBoard) setGenerationPending(false);
  }, [newBoard, setGenerationPending]);

  useEffect(() => {
    if (errorOnBoardGeneration) {
      setTimeout(() => {
        setGenerationPending(false);
        cleanBoard();
      }, 2000);
    }
  }, [errorOnBoardGeneration, cleanBoard, setGenerationPending]);
  if (isGenerationPending || errorOnBoardGeneration)
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {errorOnBoardGeneration ? (
          <p style={{ color: 'red' }}>ERROR!</p>
        ) : (
          <p>LOADING...</p>
        )}
      </Box>
    );

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box sx={styles.initialContentContainer}>
        <Typography sx={styles.introductionTitle}>
          {messages.rich('createANewBoard', {
            br: () => <br />,
            b: (children) => <b>{children}</b>,
          })}
        </Typography>
        <SvgIcon sx={styles.brandIcon}>
          <Brand />
        </SvgIcon>
        <Box sx={styles.examplesContainer}>
          <Box>
            <Typography>{messages('examples')}</Typography>
          </Box>
          <Divider />
          <Box sx={styles.promptExamples}>
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
