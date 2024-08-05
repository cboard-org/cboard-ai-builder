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
// import { RowsIcon, ColumnsIcon } from './icons';
import theme from '@/theme';
import GridSizeSelect from './GridSizeSelect';
import { useLocale, useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';
import { useShallow } from 'zustand/react/shallow';
import { STASHED_CONTENT_ID } from '../constants';
import { useRouter } from '@/navigation';
import usePromptBlinkAnimation from './usePromptBlinkAnimation';
import { Theme } from '@mui/material';
import styles from './styles';

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

const useFormStateWatcher = () => {
  const [state, formAction] = useFormState(submit, null);
  const [setBoard, setErrorOnBoardGeneration, stashDashboard] = useBoundStore(
    useShallow((state) => [
      state.setBoard,
      state.setErrorOnBoardGeneration,
      state.stashDashboard,
    ]),
  );
  const router = useRouter();
  React.useEffect(() => {
    if (state?.error) setErrorOnBoardGeneration();
    if (state?.board) {
      setBoard(state.board);
      stashDashboard();
      router.push(`/dashboard/${STASHED_CONTENT_ID}`);
    }
  }, [state, setErrorOnBoardGeneration, stashDashboard, router, setBoard]);
  return formAction;
};

export function PromptForm() {
  const [cleanBoard, prompt, setPrompt, setGenerationPending] = useBoundStore(
    useShallow((state) => [
      state.cleanBoard,
      state.prompt,
      state.setPrompt,
      state.setGenerationPending,
    ]),
  );
  const message = useTranslations('PromptForm');

  const initialPromptValue: PromptRecord = {
    description: '',
    rows: 5,
    columns: 5,
    colorScheme: 'fitzgerald',
    shouldUsePictonizer: true,
  };

  const [controlledPromptValue, setControlledPromptValue]: [
    PromptRecord,
    React.Dispatch<React.SetStateAction<PromptRecord>>,
  ] = React.useState(initialPromptValue);
  const descriptionTextFieldRef = React.useRef<HTMLElement>(null);
  const formRef = React.useRef<HTMLElement>(null);

  const formAction = useFormStateWatcher();

  const preventBlinkAnimation = React.useRef(false);
  const blink = usePromptBlinkAnimation(
    prompt,
    setControlledPromptValue,
    preventBlinkAnimation,
  );

  return (
    <Box
      sx={{
        ...styles.promptForm,
        backgroundColor: (theme: Theme) => theme.palette.grey[100],
      }}
    >
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
            setGenerationPending(true);
            preventBlinkAnimation.current = true;
            cleanBoard();
            if (controlledPromptValue) {
              setControlledPromptValue(controlledPromptValue);
              setPrompt(controlledPromptValue);
            }
          }}
          action={formAction}
        >
          <input type="hidden" name="locale" value={useLocale()} />
          <Grid p={3} container>
            <Grid pt={0} item xs={12}>
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
                    {/* <RowsIcon fontSize="small" /> */}
                    <Typography
                      id="rows-label"
                      variant="subtitle1"
                      component="label"
                    >
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
                    {/* <ColumnsIcon fontSize="small" /> */}
                    <Typography
                      id="columns-label"
                      variant="subtitle1"
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
                  mt: '0.3rem',
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
                    variant="subtitle1"
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
                  inputProps={{ minLength: 5, maxLength: 180 }}
                  sx={{ backgroundColor: 'white', fontSize: '0.5rem' }}
                  inputRef={descriptionTextFieldRef}
                  onChange={(e) => {
                    setControlledPromptValue({
                      ...controlledPromptValue,
                      description: e.target.value,
                    });
                  }}
                  value={controlledPromptValue.description}
                />
              </Box>
            </Grid>
            <Grid sx={{ display: 'none' }} item xs={12}>
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
                    defaultValue="fitzgerald"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ backgroundColor: 'white' }}
                    onChange={(e) => {
                      setControlledPromptValue({
                        ...controlledPromptValue,
                        colorScheme:
                          e.target.value === 'fitzgerald' ||
                          e.target.value === 'something-else' ||
                          e.target.value === 'foo'
                            ? e.target.value
                            : 'fitzgerald',
                      });
                    }}
                    value={controlledPromptValue.colorScheme}
                  >
                    <MenuItem value="fitzgerald">Fitzgerald</MenuItem>
                    <MenuItem value="something-else">something-else</MenuItem>
                    <MenuItem value="foo">foo</MenuItem>
                  </Select>
                </FormControl>
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
                  control={
                    <Switch
                      checked={controlledPromptValue.shouldUsePictonizer}
                      onChange={(e) => {
                        setControlledPromptValue({
                          ...controlledPromptValue,
                          shouldUsePictonizer: e.target.checked,
                        });
                      }}
                    />
                  }
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
    </Box>
  );
}
