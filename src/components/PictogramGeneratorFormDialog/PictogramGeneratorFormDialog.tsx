import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

type PictogramGeneratorFormDialogProps = {
  onClose: () => void;
  onGenerateInitClick: (label: string) => void;
  initialInput: string;
};

const PictogramGeneratorFormDialog = ({
  onClose,
  onGenerateInitClick,
  initialInput,
}: PictogramGeneratorFormDialogProps) => {
  const [input, setInput] = useState(initialInput);

  const handleGenerate = () => {
    onGenerateInitClick(input);
  };

  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Use Pictonizer to generate pictograms
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Generate four pictograms for
      </Typography>
      <TextField
        fullWidth
        variant="standard"
        placeholder="See"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button onClick={onClose}>CANCEL</Button>
        <Button
          variant="contained"
          startIcon={<AutoFixHighIcon />}
          onClick={handleGenerate}
          disabled={!input}
        >
          GENERATE
        </Button>
      </Stack>
    </Box>
  );
};

export default PictogramGeneratorFormDialog;
