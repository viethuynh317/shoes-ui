import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../../components/Notification/Notification';
import { getTokenSignIn } from './signInSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const schema = yup
  .object({
    email: yup.string().email().required('This field is required.'),
    password: yup.string().required('This field is required.'),
  })
  .required();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isCall, setIsCall] = useState(false);
  const history = useHistory();
  const [statusCode, setStatusCode] = useState(200);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const signInRes = useSelector((state) => state?.signIn);

  const handleFormSubmit = async (data) => {
    try {
      const res = await dispatch(getTokenSignIn({ data }));
      setStatusCode(res?.payload?.status);
      setIsCall(true);
      setTimeout(() => {
        history.push('/admin/shoes');
      }, 1000);
    } catch (error) {
      setStatusCode(400);
    }
  };

  useEffect(() => {
    if (
      (statusCode === 400 || statusCode === 401 || statusCode === 404) &&
      isCall
    ) {
      setNotify({
        isOpen: true,
        message: 'Email or password incorrect',
        type: 'error',
      });
    }
  }, [isCall, statusCode]);

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/daily)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                {...register('email')}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                {...register('password')}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
              <Box display="flex" justifyContent="flex-end">
                <Link
                  href="/auth/forgot_password"
                  variant="button"
                  underline="none"
                >
                  Forgot password
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={signInRes?.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
