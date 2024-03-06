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
import { usePromptStore } from '@/providers/PromptStoreProvider';
import { useBoardStore } from '@/providers/BoardStoreProvider';

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

const useBlink = (
  description: string,
  setDescriptionValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [blink, setBlink] = React.useState(true);

  React.useEffect(() => {
    if (description) setBlink(false);
    setTimeout(() => {
      setBlink(true);
      setDescriptionValue(description);
    }, 300);
  }, [description, setDescriptionValue]);

  return blink;
};

export function PromptForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(submit, null);
  const { setBoard, cleanBoard } = useBoardStore((state) => state);
  const message = useTranslations('PromptForm');
  const { description, setPrompt } = usePromptStore((state) => state);
  const [descriptionValue, setDescriptionValue] = React.useState('');
  const descriptionTextFieldRef = React.useRef<HTMLElement>(null);
  const formRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (state?.boardData) setBoard(state.boardData);
  }, [state?.boardData, setBoard]);

  const blink = useBlink(description, setDescriptionValue);

  return (
    <Fade
      appear={false}
      in={blink}
      addEndListener={() => {
        if (blink) {
          formRef.current?.scrollIntoView(false);
          descriptionTextFieldRef.current?.focus();
        }
      }}
      ref={formRef}
    >
      <form onSubmit={() => cleanBoard()} action={formAction}>
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
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="light">Light</MenuItem>
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
                  {message('aiPrompt')}
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
                  description && setPrompt({ description: '' });
                  setDescriptionValue(e.target.value);
                }}
                value={descriptionValue}
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
            <SubmitButton text={message('newAiBoard')} />
          </Grid>
        </Grid>
      </form>
    </Fade>
  );
}
