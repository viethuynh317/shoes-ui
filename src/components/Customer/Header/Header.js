import { Box } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import MobileNav from './MobileNav/MobileNav';
import Nav from './Nav/Nav';
import Navbar from './Navbar/Navbar';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 9999,
  width: '100%',
}));

const Header = () => {
  const [width] = useWindowSize();
  return (
    <HeaderWrapper
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {width > 768 ? (
        <>
          <Navbar hasHomePage sizeWidth={width} />
          <Nav sizeWidth={width} />
        </>
      ) : (
        <MobileNav hasHomePage sizeWidth={width} />
      )}
    </HeaderWrapper>
  );
};

export default Header;
