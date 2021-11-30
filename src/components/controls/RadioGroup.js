import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from '@mui/material';

export default function RadioGroup(props) {
  const { name, label, value, onChange, items, disabled, indexs } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item, indx) => {
          if (disabled === null)
            return (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.title}
                disabled={indexs.some((check) => check === indx) ? false : true}
              />
            );
          return (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio />}
              label={item.title}
              disabled={disabled}
            />
          );
        })}
      </MuiRadioGroup>
    </FormControl>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  disabled: PropTypes.bool,
  indexs: PropTypes.instanceOf(Array),
};

RadioGroup.defaultProps = {
  name: '',
  label: '',
  value: 0,
  onChange: null,
  items: [],
  disabled: null,
  indexs: [],
};
