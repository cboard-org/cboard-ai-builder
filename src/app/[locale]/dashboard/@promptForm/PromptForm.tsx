'use client';
import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submit } from './actions';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { RowsIcon, ColumnsIcon } from './icons';
import theme from '@/theme';
import GridSizeSelect from './GridSizeSelect';
import { useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import { Prompt } from '../types';

const totalRows = 12;
const totalColumns = 12;

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="contained"
        type="submit"
        disabled={pending}
        sx={{ width: '100%' }}
      >
        <Typography variant="body2" component="div">
          {text}
        </Typography>
      </Button>
      {pending && (
        <CircularProgress
          size={21}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-0.7em',
            marginLeft: '-0.5em',
          }}
        />
      )}
    </Box>
  );
}

const usePromptBlinkAnimation = (
  prompt: Prompt,
  setControlledPromptValue: React.Dispatch<React.SetStateAction<Prompt>>,
) => {
  const [blink, setBlink] = React.useState(true);
  const trigAnimation = React.useCallback(() => {
    if (prompt) setBlink(false);
    setTimeout(() => {
      setBlink(true);
      setControlledPromptValue(prompt);
    }, 300);
  }, [prompt, setControlledPromptValue]);

  const useTrigAnimationOnPromptChange = ({
    prompt,
    trigAnimation,
  }: {
    prompt: Prompt;
    trigAnimation: () => void;
  }) => {
    const prevPrompt = usePrevious(prompt);
    React.useEffect(() => {
      const promptIsUpdated =
        JSON.stringify(prevPrompt) !== JSON.stringify(prompt);
      if (promptIsUpdated) trigAnimation();
    }, [prompt, trigAnimation, prevPrompt]);
  };

  useTrigAnimationOnPromptChange({ prompt, trigAnimation });

  return blink;
};

const useFormStateWatcher = () => {
  const [state, formAction] = useFormState(submit, null);
  const { setBoard, setErrorOnBoardGeneration } = useBoundStore(
    (state) => state,
  );

  React.useEffect(() => {
    if (state?.error) setErrorOnBoardGeneration();
    if (state?.board) setBoard(state.board);
  }, [state, setBoard, setErrorOnBoardGeneration]);
  return formAction;
};

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export function PromptForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cleanBoard } = useBoundStore((state) => state);
  const message = useTranslations('PromptForm');
  const { prompt, setPrompt } = useBoundStore((state) => state);

  const initialPromptValue: Prompt = {
    description: '',
    rows: 5,
    columns: 5,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: true,
  };

  const [controlledPromptValue, setControlledPromptValue]: [
    Prompt,
    React.Dispatch<React.SetStateAction<Prompt>>,
  ] = React.useState(initialPromptValue);
  const descriptionTextFieldRef = React.useRef<HTMLElement>(null);
  const formRef = React.useRef<HTMLElement>(null);

  const formAction = useFormStateWatcher();

  const blink = usePromptBlinkAnimation(prompt, setControlledPromptValue);

  return (
    <Fade
      appear={true}
      in={blink}
      addEndListener={() => {
        if (blink) {
          formRef.current?.scrollIntoView(false);
          descriptionTextFieldRef.current?.focus();
        }
      }}
      ref={formRef}
    >
      <form
        onSubmit={() => {
          cleanBoard();
          if (controlledPromptValue) {
            setControlledPromptValue(controlledPromptValue);
            setPrompt(controlledPromptValue);
          }
        }}
        action={formAction}
      >
        <Grid p={3} container>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 0',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: '0.3rem',
                  }}
                >
                  <RowsIcon fontSize="small" />
                  <Typography id="rows-label" variant="body2" component="label">
                    {message('rows')}
                  </Typography>
                </Box>
                <FormControl size="small">
                  <GridSizeSelect
                    name="rows"
                    labelId="rows-label"
                    totalItems={totalRows}
                    initialValue={5}
                    onChange={(e) => {
                      setControlledPromptValue({
                        ...controlledPromptValue,
                        rows: Number(e.target.value),
                      });
                    }}
                    value={controlledPromptValue.rows}
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 0',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: '0.3rem',
                  }}
                >
                  <ColumnsIcon fontSize="small" />
                  <Typography
                    id="columns-label"
                    variant="body2"
                    component="label"
                  >
                    {message('columns')}
                  </Typography>
                </Box>
                <FormControl size="small">
                  <GridSizeSelect
                    name="columns"
                    labelId="columns-label"
                    totalItems={totalColumns}
                    initialValue={5}
                    onChange={(e) => {
                      setControlledPromptValue({
                        ...controlledPromptValue,
                        columns: Number(e.target.value),
                      });
                    }}
                    value={controlledPromptValue.columns}
                  />
                </FormControl>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                mt: '0.5rem',
                mb: '0.3rem',
              }}
            >
              <Stack
                spacing={1}
                direction="row"
                useFlexGap
                flexWrap="nowrap"
                sx={{
                  alignContent: 'center',
                  alignItems: 'center',
                  mb: '0.3rem',
                }}
              >
                <Typography
                  id="color-scheme-label"
                  variant="body2"
                  component="label"
                >
                  {message('colorScheme')}
                </Typography>
                <IconButton
                  aria-label="help"
                  sx={{ fontSize: 'inherit' }}
                  size="small"
                >
                  <HelpOutlineIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <FormControl size="small">
                <Select
                  id="color-scheme"
                  name="color-scheme"
                  labelId="color-scheme-label"
                  defaultValue="default"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ backgroundColor: 'white' }}
                  onChange={(e) => {
                    setControlledPromptValue({
                      ...controlledPromptValue,
                      colorScheme:
                        e.target.value ===
                        ('fitzgerald' || 'something-else' || 'foo')
                          ? e.target.value
                          : 'fitzgerald',
                    });
                  }}
                >
                  <MenuItem value="fitzgerald">Fitzgerald</MenuItem>
                  <MenuItem value="something-else">Dark</MenuItem>
                  <MenuItem value="foo">Light</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', mt: '0.3rem' }}
            >
              <Stack
                spacing={1}
                direction="row"
                useFlexGap
                flexWrap="nowrap"
                sx={{
                  alignContent: 'center',
                  alignItems: 'center',
                  mb: '0.3rem',
                }}
              >
                <Typography
                  id="color-scheme-label"
                  variant="body2"
                  component="label"
                >
                  {message('prompt')}
                </Typography>
                <IconButton
                  aria-label="help"
                  sx={{ fontSize: 'inherit' }}
                  size="small"
                >
                  <HelpOutlineIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <TextField
                id="prompt-text"
                name="prompt-text"
                multiline
                rows={3}
                required
                InputProps={{
                  inputComponent: 'textarea',
                  style: {
                    fontSize: '1rem',
                    color: theme.palette.text.secondary,
                    paddingTop: '0.5rem',
                  },
                }}
                inputProps={{ minLength: 5, maxLength: 60 }}
                sx={{ backgroundColor: 'white', fontSize: '0.5rem' }}
                inputRef={descriptionTextFieldRef}
                onChange={(e) => {
                  setControlledPromptValue({
                    ...controlledPromptValue,
                    description: e.target.value,
                  });
                }}
                value={
                  controlledPromptValue.description.length === 0
                    ? undefined
                    : controlledPromptValue.description
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                my: '.5rem',
              }}
            >
              <FormControlLabel
                id="use-ai-pictograms"
                name="use-ai-pictograms"
                control={<Switch defaultChecked />}
                label={
                  <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    useFlexGap
                    flexWrap="nowrap"
                    sx={{
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography fontSize={'0.7rem'}>
                      {message('useAiPictograms')}
                    </Typography>
                    <IconButton
                      aria-label="help"
                      sx={{ fontSize: 'inherit' }}
                      size="small"
                    >
                      <HelpOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Stack>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <SubmitButton text={message('newBoard')} />
          </Grid>
        </Grid>
      </form>
    </Fade>
  );
}
