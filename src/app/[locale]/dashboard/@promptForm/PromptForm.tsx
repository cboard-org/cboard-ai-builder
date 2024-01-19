'use client';
import * as React from 'react';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { submit } from './actions';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { RowsIcon, ColumnsIcon } from './icons';
import theme from '@/theme';
import GridSizeSelect from './GridSizeSelect';

const totalRows = 12;
const totalColumns = 12;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        variant="contained"
        type="submit"
        disabled={pending}
        sx={{ width: '100%' }}
      >
        <Typography variant="body2" component="div">
          NEW AI BOARD
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

export function PromptForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(submit, null);

  return (
    <form action={formAction}>
      <Grid container>
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
                  Rows
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
                  Columns
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
                Color Scheme
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
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '0.3rem' }}>
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
                AI prompt
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
              rows={5}
              required
              InputProps={{
                inputComponent: 'textarea',
                style: {
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                },
              }}
              inputProps={{ minLength: 5, maxLength: 10 }}
              sx={{ backgroundColor: 'white', fontSize: '0.5rem' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              mt: '.5rem',
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
                  useFlexGap
                  flexWrap="nowrap"
                  sx={{
                    alignContent: 'center',
                    alignItems: 'center',
                    mb: '0.3rem',
                  }}
                >
                  <Typography fontSize={'0.7rem'}>Use AI pictograms</Typography>
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
          <SubmitButton />
        </Grid>
      </Grid>
    </form>
  );
}
