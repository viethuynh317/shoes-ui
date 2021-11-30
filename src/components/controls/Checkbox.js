import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

export default function Checkbox(props) {
  const { name, label, value, onChange, disabled } = props;

  const convertToDefEventPara = (name, value) => ({
    name,
    value: value ? 1 : 0,
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))}
            disabled={disabled}
          />
        }
        label={label}
      />
    </FormControl>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Checkbox.defautProps = {
  name: '',
  label: '',
  value: false,
  items: [],
  disabled: false,
};
