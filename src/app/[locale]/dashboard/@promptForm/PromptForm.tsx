'use client';
import * as React from 'react';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { createTodo } from './actions';
import {
  Box,
  Select,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  FormControl,
} from '@mui/material';
import { MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { RowsIcon, ColumnsIcon } from './icons';
import theme from '@/theme';

const initialState = {
  message: '',
};

const totalRows = 10;
const totalColumns = 10;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    // <button type="submit" aria-disabled={pending}>
    //   Add
    // </button>
    <Button
      variant="contained"
      type="submit"
      aria-disabled={pending}
      sx={{ width: '100%', mt: '0.5rem' }}
    >
      <Typography variant="body2" component="div">
        NEW AI BOARD
      </Typography>
    </Button>
  );
}

export function PromptForm() {
  const [rowSelected, setRowSelected] = React.useState('5');
  const [columnSelected, setColumnSelected] = React.useState('5');
  const [state, formAction] = useFormState(createTodo, initialState);

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
              id="outlined-multiline-flexible"
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
              control={<Switch defaultChecked />}
              label={
                <Typography fontSize={'0.7rem'}>Use AI pictograms</Typography>
              }
            />
          </Box>
        </Grid>

        {/* <input type="text" id="todo" name="todo" required /> */}
        {/* <label htmlFor="todo">Todo</label> */}
        <Grid item xs={12}>
          <SubmitButton />
        </Grid>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </Grid>
    </form>
  );
}
