import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Props = {
  name: string;
  labelId: string;
  totalItems: number;
  initialValue: number;
};

export default function GridSizeSelect({
  name,
  labelId,
  totalItems,
  initialValue,
}: Props) {
  return (
    <Select
      id={name}
      name={name}
      labelId={labelId}
      defaultValue={initialValue}
      displayEmpty
      sx={{ backgroundColor: 'white' }}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <MenuItem value={index + 1} key={`${name}-${index + 1}`}>
          {index + 1}
        </MenuItem>
      ))}
    </Select>
  );
}
