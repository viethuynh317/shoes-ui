import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Footer from '../../../../components/Customer/Footer/Footer';
import MobileNav from '../../../../components/Customer/Header/MobileNav/MobileNav';
import Nav from '../../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../../components/Customer/Header/Navbar/Navbar';
import Notification from '../../../../components/Notification';
import useWindowSize from '../../../../hooks/customHooks/useWindowsSize';
import { registerCustomer } from '../authCustomerSlice';

const HomePageMain = styled(Box)(({ theme, sizeWidth }) => ({
  margin:
    sizeWidth > 992
      ? '4rem 7.5rem'
      : sizeWidth <= 992 && sizeWidth > 786
      ? '4rem 4rem'
      : '4rem 1.5rem',
}));

const TextInput = styled(TextField)(() => ({
  width: '60%',
}));

const SignInLink = styled(Link)(() => ({
  textDecoration: 'none',
}));

const schema = yup
  .object({
    email: yup.string().email().required('This field is required.'),
    password: yup.string().required('This field is required.'),
    fullName: yup.string().required('This field is required.'),
    phoneNumber: yup
      .string()
      .min(9)
      .max(12)
      .required('This field is required.'),
  })
  .required();

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [width] = useWindowSize();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (statusCode) {
      setNotify({
        isOpen: true,
        message: 'Register Successfully!',
        type:
          statusCode === 200 ||
          statusCode === 201 ||
          statusCode === 202 ||
          statusCode === 203 ||
          statusCode === 204
            ? 'success'
            : 'error',
      });
    }
  }, [statusCode]);

  const [date, setDate] = useState(new Date());
  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await dispatch(
        registerCustomer({
          ...data,
          roleId: 1,
          birthday: data?.birthday || new Date(),
        })
      );
      setStatusCode(res?.payload?.status);
      setTimeout(() => {
        history.push('/user/sign-in');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      history.push('/user/sign-in');
      setStatusCode(400);
    }
  };
  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        {width > 768 ? (
          <>
            <Navbar sizeWidth={width} />
            <Nav sizeWidth={width} />
          </>
        ) : (
          <MobileNav sizeWidth={width} />
        )}
      </Box>
      <HomePageMain sizeWidth={width}>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid container columnSpacing={3}>
              <Grid item sm={6} display="flex" justifyContent="flex-end">
                <TextInput
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  {...register('email')}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="flex-start">
                <TextInput
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
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="flex-end">
                <TextInput
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  {...register('fullName')}
                  error={!!errors?.fullName}
                  helperText={errors?.fullName?.message}
                />
              </Grid>

              <Grid item sm={6} display="flex" justifyContent="flex-start">
                <TextInput
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  {...register('phoneNumber')}
                  error={!!errors?.phoneNumber}
                  helperText={errors?.phoneNumber?.message}
                />
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="flex-end">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Birthday"
                    value={date || new Date()}
                    onChange={(newValue) => {
                      setDate(newValue);
                      setValue('birthday', newValue);
                    }}
                    renderInput={(params) => (
                      <TextInput
                        {...register('birthday')}
                        margin="normal"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="flex-start">
                <TextInput
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Address"
                  {...register('address')}
                  error={!!errors?.address}
                  helperText={errors?.address?.message}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={1}>
              <Typography>
                Already have an account? &nbsp;
                <SignInLink to="/user/sign-in">Sign in</SignInLink>
              </Typography>
            </Box>
            <LoadingButton
              type="submit"
              loadingPosition="start"
              loading={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '30%' }}
            >
              Sign up
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

export default SignUp;
