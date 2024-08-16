'use client';
import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submit } from './actions';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import TuneIcon from '@mui/icons-material/Tune';
import theme from '@/theme';
import GridSizeSelect from './GridSizeSelect';
import { useLocale, useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';
import { useShallow } from 'zustand/react/shallow';
import { STASHED_CONTENT_ID } from '../constants';
import { useRouter } from '@/navigation';
import usePromptBlinkAnimation from './usePromptBlinkAnimation';
import InputLabel from '@mui/material/InputLabel';
import styles from './styles';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const totalRows = 12;
const totalColumns = 12;

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Box>
      <Tooltip title={text}>
        <IconButton
          type="submit"
          disabled={pending}
          sx={styles.submitIconButton}
        >
          {pending ? (
            <CircularProgress size={25} sx={{ justifyContent: 'center' }} />
          ) : (
            <AutoFixNormalIcon
              sx={{ color: theme.palette.primary.contrastText }}
            />
          )}
        </IconButton>
      </Tooltip>
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
    shouldUsePictonizer: false,
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
          <Box sx={{ display: 'flex' }}>
            <Grid direction={'row'} container gap={1}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 'max-content',
                    backgroundColor: theme.palette.custom.filledBackground,
                    borderRadius: 5,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <TuneIcon sx={{ ml: 2, color: 'text.secondary' }} />
                  <Box display={'flex'} flexWrap={'wrap'}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexGrow: 1,
                      }}
                    >
                      <InputLabel sx={{ ml: 2 }} id="demo-multiple-chip-label">
                        {message('rows')}
                      </InputLabel>
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
                        justifySelf: 'flex-end',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexGrow: 1,
                      }}
                    >
                      <InputLabel sx={{ ml: 2 }} id="demo-multiple-chip-label">
                        {message('columns')}
                      </InputLabel>
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
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder={message('prompt')}
                  fullWidth
                  id="prompt-text"
                  name="prompt-text"
                  multiline
                  rows={1}
                  required
                  InputProps={{
                    inputComponent: 'textarea',
                    style: {
                      fontSize: '1rem',
                      color: theme.palette.text.primary,
                    },
                    endAdornment: <SubmitButton text={message('newBoard')} />,
                  }}
                  inputProps={{
                    minLength: 5,
                    maxLength: 180,
                  }}
                  variant="filled"
                  sx={{
                    backgroundColor: 'white',
                    fontSize: '0.5rem',
                    '.MuiFilledInput-underline:before': {
                      borderBottom: 'none',
                    },
                    '.MuiFilledInput-underline:after': {
                      borderBottom: 'none',
                    },
                    '.MuiFilledInput-underline:hover:not(.Mui-disabled):before':
                      {
                        borderBottom: 'none',
                      },
                    '.MuiFilledInput-root': {
                      padding: 1,
                      borderRadius: 5,
                      overflow: 'hidden',
                    },
                    '.MuiInputBase-input': {
                      padding: 1,
                      backgroundColor: 'transparent',
                    },
                  }}
                  inputRef={descriptionTextFieldRef}
                  onChange={(e) => {
                    setControlledPromptValue({
                      ...controlledPromptValue,
                      description: e.target.value,
                    });
                  }}
                  value={controlledPromptValue.description}
                />
              </Grid>
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
                <Stack
                  spacing={1}
                  direction="row"
                  useFlexGap
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
          </Box>
        </form>
      </Fade>
    </Box>
  );
}
