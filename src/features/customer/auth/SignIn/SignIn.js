import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Footer from '../../../../components/Customer/Footer/Footer';
import Nav from '../../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../../components/Customer/Header/Navbar/Navbar';
import Notification from '../../../../components/Notification';
import { loginUser } from '../../../auth/authSlice';

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '2rem 7.5rem',
}));

const SignUpLink = styled(Link)(() => ({
  textDecoration: 'none',
}));
const schema = yup
  .object({
    email: yup.string().email().required('This field is required.'),
    password: yup.string().required('This field is required.'),
  })
  .required();

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await dispatch(loginUser(data));
      if (res?.payload?.status === 200 || res?.payload?.status === 201)
        history.push('/user/homepage');
      if (
        res?.payload?.status === 400 ||
        res?.payload?.status === 401 ||
        res?.payload?.status === 404 ||
        res?.payload?.status === 409
      ) {
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
        history.push('/user/sign-in');
      }
      setIsLoading(false);
    } catch (error) {
      history.push('/user/sign-in');
    }
  };
  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Navbar />
        <Nav />
      </Box>
      <HomePageMain>
        <Box
          sx={{
            my: 15,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#202020' }}>
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
              <Typography>
                Don't have an account?&nbsp;
                <SignUpLink to="/user/sign-up">Sign Up</SignUpLink>
              </Typography>
            </Box>
            <LoadingButton
              type="submit"
              loadingPosition="start"
              loading={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </HomePageMain>
      <Box mt={8}>
        <Footer />
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default SignIn;
