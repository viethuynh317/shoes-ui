import { FormControl, InputLabel, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    '& .MuiOutlinedInput-root': {
      height: '42px',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectForm: {
    fontSize: '0.85rem',
  },
  focus: {
    backgroundColor: 'white',
  },
}));

export default function ComboBox({ options, title, onChange, name, disabled, value }) {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">{title}</InputLabel>
        <Select
          native
          label={title}
          onChange={onChange}
          name={name}
          className={clsx(classes.selectForm, { focused: classes.focus })}
          disabled={disabled || false}
        >
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {value || option.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

ComboBox.propTypes = {
  options: PropTypes.instanceOf(Array),
  title: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

ComboBox.defaultProps = {
  options: [],
  title: '',
  onChange: null,
  name: '',
  disabled: null,
  value: null,
};
