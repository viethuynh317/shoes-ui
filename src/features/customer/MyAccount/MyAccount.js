import { Box, Button, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '4rem 7.5rem 2rem',
}));

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
}));

const MyAccount = ({ children }) => {
  const history = useHistory();

  const breadcrumbs = [
    <BreadCrumbLink underline="hover" key="1" href="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      My Account
    </Typography>,
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Navbar />
        <Nav />
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="my account" />
      <HomePageMain>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3} mt={1}>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  history.push('/user/my-account/orders');
                }}
              >
                Orders
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  history.push('/user/my-account/details');
                }}
              >
                Account Details
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  history.push('/user/my-account/change-password');
                }}
              >
                Change Password
              </Button>
              <Button
                sm={12}
                variant="outlined"
                color="inherit"
                onClick={() => {
                  localStorage.removeItem('customerToken');
                  localStorage.removeItem('customerRefreshToken');
                  localStorage.removeItem('customerRoleId');
                  localStorage.removeItem('customerProfile');
                  history.push('/user/sign-in');
                }}
              >
                Logout
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            {children}
          </Grid>
        </Grid>
      </HomePageMain>
      <Box mt={8}>
        <Footer />
      </Box>
    </>
  );
};

export default MyAccount;
