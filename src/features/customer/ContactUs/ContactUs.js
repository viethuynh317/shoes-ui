import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { Box, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import MobileNav from '../../../components/Customer/Header/MobileNav/MobileNav';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import GoogleMap from './components/GoogleMap';

const HomePageMain = styled(Box)(({ theme, sizeWidth }) => ({
  margin:
    sizeWidth > 992
      ? '4rem 7.5rem 2rem'
      : sizeWidth <= 992 && sizeWidth > 786
      ? '4rem 4rem 2rem'
      : '4rem 1.5rem 2rem',
}));

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
}));

const TypoTitle = styled(Typography)(() => ({
  fontSize: 24,
  fontWeight: 700,
  '&::after': {
    content: '',
    position: 'absolute',
    width: '50px',
    height: '2px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    left: '50%',
    marginLeft: '-25px',
    bottom: 0,
  },
}));

const ContactUs = ({ google }) => {
  const [width] = useWindowSize();
  const breadcrumbs = [
    <BreadCrumbLink underline="hover" key="1" href="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      Contact Us
    </Typography>,
  ];

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
      <BannerPage breadcrumbs={breadcrumbs} title="contact us" />
      <HomePageMain sizeWidth={width}>
        <Box sx={{ position: 'relative', width: '100%', height: 700 }}>
          <GoogleMap />
        </Box>
        <Box mt={4}>
          <Typography sx={{ fontSize: 18 }}>YOU’RE WELCOME</Typography>
          <TypoTitle>KEEP IN TOUCH</TypoTitle>
        </Box>
        <Box mt={2}>
          <Typography sx={{ color: '#848484', fontSize: 15 }}>
            Effect significant free expression rural development vaccine focus
            on impact our ambitions. <br /> Marginalized communities results
            local solutions Kony 2012 outcomes <br /> connect eradicate
            partnership.
          </Typography>
        </Box>
        <Box mt={8}>
          <Grid container>
            <Grid item sx={12} sm={12} md={6} lg={3}>
              <LocationOnOutlinedIcon />
              <Typography sx={{ ml: 2, display: 'inline-block' }}>
                Address
              </Typography>
              <Typography sx={{ color: '#848484', fontSize: 15, mt: 1 }}>
                54 Nguyen Luong Bang, Da Nang
              </Typography>
            </Grid>
            <Grid item sx={12} sm={12} md={6} lg={3}>
              <LocalPhoneOutlinedIcon />
              <Typography sx={{ ml: 2, display: 'inline-block' }}>
                Phone Number
              </Typography>
              <Typography sx={{ color: '#848484', fontSize: 15, mt: 1 }}>
                033 8948317
              </Typography>
            </Grid>
            <Grid item sx={12} sm={12} md={6} lg={3}>
              <EmailOutlinedIcon />
              <Typography sx={{ ml: 2, display: 'inline-block' }}>
                Email
              </Typography>
              <Typography sx={{ color: '#848484', fontSize: 15, mt: 1 }}>
                huynhvanviet317@gmail.com
              </Typography>
            </Grid>
            <Grid item sx={12} sm={12} md={6} lg={3}>
              <PublicOutlinedIcon />
              <Typography sx={{ ml: 2, display: 'inline-block' }}>
                Media
              </Typography>
              <Typography sx={{ color: '#848484', fontSize: 15, mt: 1 }}>
                https://www.facebook.com/profile.php?id=100014881625813
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </HomePageMain>
      <Box mt={8}>
        <Footer />
      </Box>
    </>
  );
};

export default ContactUs;
