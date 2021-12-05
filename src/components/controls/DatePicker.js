import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/lab';

export default function DatePicker(props) {
  const { name, label, value, onChange, error = null, ...other } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        disabledToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MM/dd/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        {...other}
        {...(error && { error: true, helperText: error })}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
