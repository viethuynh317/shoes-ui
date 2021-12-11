import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

export default function Input(props) {
  const {
    id,
    name,
    label,
    type,
    value,
    error = null,
    onChange,
    onBlur,
    isDisableEmail,
    disabled,
    ...other
  } = props;
  return (
    <TextField
      id={id}
      variant="outlined"
      label={label}
      type={type}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      disabled={isDisableEmail || disabled}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  isDisableEmail: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  name: '',
  label: '',
  value: undefined,
  error: '',
  onChange: null,
  onBlur: null,
  items: [],
  disabled: null,
  indexs: [],
  isDisableEmail: null,
  type: 'text',
};
