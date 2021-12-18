import { Box } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import Nav from './Nav/Nav';
import Navbar from './Navbar/Navbar';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 9999,
  width: '100%',
}));

const Header = () => {
  return (
    <HeaderWrapper
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Navbar hasHomePage />
      <Nav />
    </HeaderWrapper>
  );
};

export default Header;
