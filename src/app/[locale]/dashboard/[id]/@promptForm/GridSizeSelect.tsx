import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  name: string;
  labelId: string;
  totalItems: number;
  initialValue: number;
  value: number;
  onChange: (event: SelectChangeEvent<number>) => void;
};

export default function GridSizeSelect({
  name,
  labelId,
  totalItems,
  initialValue,
  value,
  onChange,
}: Props) {
  return (
    <Select
      id={name}
      name={name}
      labelId={labelId}
      defaultValue={initialValue}
      value={value}
      displayEmpty
      sx={{ backgroundColor: 'white' }}
      onChange={onChange}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <MenuItem value={index + 1} key={`${name}-${index + 1}`}>
          {index + 1}
        </MenuItem>
      ))}
    </Select>
  );
}
