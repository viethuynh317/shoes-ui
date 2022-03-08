import { yupResolver } from '@hookform/resolvers/yup';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../../components/Notification';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import { changePassword } from '../profileSlice';

const TextInput = styled(TextField)(({ widthSize }) => ({
  width:
    widthSize > 992
      ? '50%'
      : widthSize <= 992 && widthSize > 768
      ? '70%'
      : '100%',
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
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [width] = useWindowSize();

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
    const res = await dispatch(changePassword(data));
    reset();
    setIsLoading(false);
    if (res.payload.msg !== 'Token expired') {
      setNotify({
        isOpen: true,
        message: res.payload.msg,
        type:
          res.type === 'profile/changePassword/fulfilled' ? 'success' : 'error',
      });
    }
  };
  return (
    <Box>
      <Typography variant="h5">Change Password</Typography>
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
            widthSize={width}
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
            widthSize={width}
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
            widthSize={width}
          />
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, minWidth: 100 }}
          >
            Change
          </Button>
        </Box>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      <Backdrop open={isLoading} className="backdrop">
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
};

export default ChangePassword;
