import { Box, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Controls from '../../../../../../components/controls/Controls';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
const roleItems = [
  { id: 1, title: 'Customer' },
  { id: 2, title: 'Employee' },
];

export default function EmployeeForm(props) {
  const {
    addOrEdit,
    recordForEdit,
    nameButton,
    isShowPasswordField,
    isDisableEmail,
  } = props;

  const schema = yup
    .object()
    .shape({
      fullName: yup.string().required('This field is required.'),
      birthday: yup.string().required('This field is required.'),
      email: yup.string().email().required('This field is required.'),
      phoneNumber: yup
        .string()
        .min(9)
        .max(12)
        .required('This field is required.'),
      password: isShowPasswordField
        ? yup.string().required('This field is required.')
        : yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    resetForm,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: recordForEdit || { birthday: new Date() },
  });

  const [date, setDate] = useState(recordForEdit?.birthday || new Date());

  const handleFormSubmit = (data) => {
    addOrEdit({ ...data, roleId: 2 }, resetForm);
  };

  // useEffect(() => {
  //   if (recordForEdit !== null)
  //     setDefaultValues({
  //       ...recordForEdit,
  //     });
  // }, [recordForEdit]);

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Email*"
            id="email"
            {...register('email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            disabled={isDisableEmail}
          />
          {isShowPasswordField && (
            <TextField
              margin="normal"
              label="Password*"
              id="password"
              fullWidth
              {...register('password')}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              type="password"
            />
          )}
          <TextField
            margin="normal"
            label="Full Name*"
            id="fullName"
            {...register('fullName')}
            error={!!errors?.fullName}
            helperText={errors?.fullName?.message}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Phone Number*"
            id="phoneNumber"
            {...register('phoneNumber')}
            error={!!errors?.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          {/* {nameButton !== 'Add' && (
            <Controls.RadioGroup
              margin="normal"
              name="role"
              label="Role"
              id="role"
              {...register('phoneNumber')}
              items={roleItems}
              disabled
            />
          )} */}

          <TextField
            margin="normal"
            label="Address"
            name="address"
            id="address"
            {...register('address')}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              label="Birthday*"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
                setValue('birthday', newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...register('birthday')}
                  margin="normal"
                  fullWidth
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <Box mt={2}>
            <Controls.Button
              type="submit"
              color="primary"
              text={nameButton}
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
