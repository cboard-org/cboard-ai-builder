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
import { SelectChangeEvent } from '@mui/material';
import { RowsIcon, ColumnsIcon } from './icons';
import theme from '@/theme';

const totalRows = 10;
const totalColumns = 10;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        variant="contained"
        type="submit"
        disabled={pending}
        sx={{ width: '100%', mt: '0.5rem' }}
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
            marginTop: '-0.4em',
            marginLeft: '-0.5em',
          }}
        />
      )}
    </Box>
  );
}

export function PromptForm() {
  const [rowSelected, setRowSelected] = React.useState('5');
  const [columnSelected, setColumnSelected] = React.useState('5');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(submit, null);

  const handleRowChange = (event: SelectChangeEvent) => {
    setRowSelected(event.target.value);
  };

  const handleColumnChange = (event: SelectChangeEvent) => {
    setColumnSelected(event.target.value);
  };

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
                }}
              >
                <RowsIcon fontSize="small" />
                <Typography variant="body2" component="label">
                  Rows
                </Typography>
              </Box>
              <FormControl size="small">
                <Select
                  id={'rows'}
                  name={'rows'}
                  value={rowSelected}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleRowChange}
                  sx={{ backgroundColor: 'white' }}
                >
                  {Array.from({ length: totalRows }).map((_, rowIndex) => (
                    <MenuItem value={rowIndex} key={`row-${rowIndex}`}>
                      {rowIndex}
                    </MenuItem>
                  ))}
                </Select>
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
                }}
              >
                <ColumnsIcon fontSize="small" />
                <Typography variant="body2" component="label">
                  Columns
                </Typography>
              </Box>
              <FormControl size="small">
                <Select
                  id="columns"
                  name="columns"
                  value={columnSelected}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleColumnChange}
                  sx={{ flexGrow: 1, backgroundColor: 'white' }}
                >
                  {Array.from({ length: totalColumns }).map(
                    (_, columnIndex) => (
                      <MenuItem
                        value={columnIndex}
                        key={`column-${columnIndex}`}
                      >
                        {columnIndex}
                      </MenuItem>
                    ),
                  )}
                </Select>
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
            }}
          >
            <Typography variant="body2" component="div">
              Color Scheme
            </Typography>
            <FormControl size="small">
              <Select
                id="color-scheme"
                name="color-scheme"
                value={columnSelected}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleColumnChange}
                sx={{ flexGrow: 1, backgroundColor: 'white' }}
              >
                <MenuItem value={1} key={`colorscheme-${1}`}>
                  {1}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '0.5rem' }}>
            <Typography variant="body2" component="div" sx={{ mb: '0.5rem' }}>
              AI prompt
            </Typography>
            <TextField
              id="prompt-text"
              name="prompt-text"
              multiline
              rows={5}
              InputProps={{
                inputComponent: 'textarea',
                style: {
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                },
              }}
              sx={{ backgroundColor: 'white', fontSize: '0.5rem' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <FormControlLabel
              id="use-ai-pictograms"
              name="use-ai-pictograms"
              control={<Switch defaultChecked />}
              label={
                <Typography fontSize={'0.7rem'}>Use AI pictograms</Typography>
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
