import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, InputBase, Paper, TextField } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import Notification from '../../../../components/Notification';
import { resetPassword, sendCodeToResetPassword } from '../../authSlice';
import './index.css';

const TextInput = styled(TextField)(() => ({
  width: '100%',
}));

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New Password is required')
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

const ForgotPassword = () => {
  const history = useHistory();
  const [isSended, setIsSended] = useState(false);
  const [email, setEmail] = useState('');
  const [isCall, setIsCall] = useState(false);

  const { actionStatus, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSendMailSubmit = async (e) => {
    e.preventDefault();
    if (!isSended) {
      const email = e.target.email.value;
      const rs = await dispatch(sendCodeToResetPassword(email));
      if (rs.payload.msg !== 'Token expired') {
        setNotify({
          isOpen: true,
          message: rs.payload.msg,
          type:
            rs.type === 'auth/sendCodeToResetPassword/fulfilled'
              ? 'success'
              : 'error',
        });
      }
      if (rs.type === 'auth/sendCodeToResetPassword/fulfilled') {
        setIsSended(true);
        setEmail(email);
      }
    } else {
      setIsSended(false);
    }
    setIsCall(true);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onResetPasswordSubmit = async (data) => {
    const dataRequest = { ...data, email };
    const rs = await dispatch(resetPassword(dataRequest));
    if (rs.type === 'auth/resetPassword/fulfilled') {
      setTimeout(() => {
        history.push('/auth/sign-in');
      }, 2500);
    }
    setIsCall(true);
  };

  useEffect(() => {
    if (isCall && actionStatus) {
      setNotify({
        isOpen: true,
        message: actionStatus.msg,
        type:
          actionStatus.status === 200 ||
          actionStatus.status === 201 ||
          actionStatus.status === 202 ||
          actionStatus.status === 203 ||
          actionStatus.status === 204
            ? 'success'
            : 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionStatus]);
  return (
    <div className="forgot-password">
      <h2 className="forgot-pass-title">Reset your password</h2>
      <div className="forgot-pass-box">
        <p>
          Enter your user account's verified email address and we will send you
          a code to reset password.
        </p>
        <Paper
          component="form"
          onSubmit={onSendMailSubmit}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase
            id="email"
            name="email"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Email"
            margin="normal"
            fullWidth
            required
          />
          <Box>
            <LoadingButton
              loadingPosition="start"
              loading={loading && !isSended}
              type="submit"
              variant="contained"
            >
              Send
            </LoadingButton>
          </Box>
        </Paper>
        {isSended ? (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onResetPasswordSubmit)}
            sx={{ mt: 1 }}
          >
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
              <TextInput
                margin="normal"
                required
                id="code"
                label="Code"
                {...register('code')}
                error={!!errors?.code}
                helperText={errors?.code?.message}
              />
            </Box>
            <Box>
              <LoadingButton
                loadingPosition="start"
                loading={loading && isSended}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, minWidth: 100 }}
              >
                Reset Password
              </LoadingButton>
            </Box>
          </Box>
        ) : null}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ForgotPassword;
