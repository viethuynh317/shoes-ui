/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../../../../components/Notification';
import { changePasswordCustomer } from '../../../../Profile/profileSlice';
import MyAccount from '../../MyAccount';

const TextInput = styled(TextField)(() => ({
  width: '100%',
}));

const FieldSet = styled('fieldset')(() => ({
  borderWidth: 1,
  borderStyle: 'solid',
  padding: 20,
}));

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    ),
  newPassword: yup
    .string()
    .required('New Password is required!')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    )
    .oneOf(
      [yup.ref('newPassword'), null],
      'The password confirmation does not match!'
    ),
});

const ChangePassword = () => {
  const { userId } = JSON.parse(localStorage.getItem('customerProfile'));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await dispatch(changePasswordCustomer({ id: userId, data }));
    reset();
    setIsLoading(false);
    if (res.payload.msg !== 'Token expired') {
      setNotify({
        isOpen: true,
        message: res.payload.msg,
        type:
          res?.payload?.status === 200 ||
          res?.payload?.status === 201 ||
          res?.payload?.status === 202 ||
          res?.payload?.status === 203 ||
          res?.payload?.status === 204
            ? 'success'
            : 'error',
      });
    }
  };
  return (
    <>
      <MyAccount>
        <FieldSet>
          <Typography
            variant="button"
            component="legend"
            textAlign="left"
            fontWeight={600}
            fontSize={17}
          >
            Change Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Box>
              <TextInput
                type="password"
                margin="normal"
                required
                id="oldPassword"
                label="Current Password"
                {...register('oldPassword')}
                error={!!errors?.oldPassword}
                helperText={errors?.oldPassword?.message}
              />
            </Box>
            <Box>
              <TextInput
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                type="password"
                {...register('newPassword')}
                error={!!errors?.newPassword}
                helperText={errors?.newPassword?.message}
              />
            </Box>

            <Box>
              <TextInput
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />
            </Box>
            <Box>
              <LoadingButton
                loadingPosition="start"
                loading={isLoading}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, minWidth: 100 }}
              >
                Change
              </LoadingButton>
            </Box>
          </Box>
          <Notification notify={notify} setNotify={setNotify} />
        </FieldSet>
      </MyAccount>
    </>
  );
};
export default ChangePassword;
