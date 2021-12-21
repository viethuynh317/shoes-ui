import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { orangeColor } from '../../../../constants/globalConst';

const BrandTypo = styled(Typography)(({ theme }) => ({
  fontSize: 28,
  fontWeight: 600,
  letterSpacing: 3,
  fontFamily: 'Permanent Marker, cursive',
  color: '#fff',
}));

const NavWrapperBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: '#202020',
}));

const ListItemTextCustom = styled(ListItemText)(({ theme }) => ({
  color: '#fff',
  '& span': {
    fontSize: 15,
    fontWeight: 600,
  },
  '&:hover': {
    color: orangeColor,
    transition: 'all 0.3s ease-in-out',
  },
}));

const NavList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 0,
}));

const ListItemButtonCustom = styled(ListItemButton)(({ theme }) => ({
  margin: '0 8px',
}));

const Nav = () => {
  const history = useHistory();
  return (
    <NavWrapperBox>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx={20}
          my={0.7}
          sx={{ height: '100%' }}
        >
          <BrandTypo>V-SHOES</BrandTypo>
          <NavList>
            <ListItemButtonCustom
              onClick={() => {
                history.push('/user/homepage');
              }}
            >
              <ListItemTextCustom primary="HOME" />
            </ListItemButtonCustom>
            <ListItemButtonCustom>
              <ListItemTextCustom primary="PAGE" />
            </ListItemButtonCustom>
            <ListItemButtonCustom>
              <ListItemTextCustom primary="BLOG" />
            </ListItemButtonCustom>
            <ListItemButtonCustom
              onClick={() => {
                history.push('/user/shoes/shops');
              }}
            >
              <ListItemTextCustom primary="SHOP" />
            </ListItemButtonCustom>
            <ListItemButtonCustom>
              <ListItemTextCustom primary="CONTACT US" />
            </ListItemButtonCustom>
          </NavList>
          <IconButton>
            <SearchOutlinedIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
      </Box>
    </NavWrapperBox>
  );
};

export default Nav;
