import { Logout } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { orangeColor } from '../../../../constants/globalConst';
import { socket } from '../../../../helper/socketIo';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const BrandTypo = styled(Typography)(({ theme, sizeWidth }) => ({
  fontSize: sizeWidth > 576 ? 28 : 20,
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
const MenuTypo = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: '#fff',
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  mr: 1,
  textTransform: 'none',
  '&:hover': {
    color: orangeColor,
    transition: 'all 0.3s ease-in-out',
  },
}));

const MobileNav = ({ hasHomePage, sizeWidth }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorElMenu);

  const hasLogin = !!localStorage.getItem('customerToken');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };
  return (
    <NavWrapperBox>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx={5}
          my={0.7}
          sx={{ height: '100%' }}
        >
          <BrandTypo sizeWidth={sizeWidth}>V-SHOES</BrandTypo>
          <Box display="flex" justifyContent="flex-end">
            {hasLogin ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => {
                      history.push('/user/my-account/orders');
                    }}
                  >
                    <Avatar /> My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push('/user/wishlist');
                    }}
                  >
                    <ListItemIcon>
                      <FavoriteIcon fontSize="small" />
                    </ListItemIcon>
                    Wishlist
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push('/user/carts');
                    }}
                  >
                    <ListItemIcon>
                      <ShoppingCartIcon fontSize="small" />
                    </ListItemIcon>
                    Cart
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem('customerToken');
                      localStorage.removeItem('customerRefreshToken');
                      localStorage.removeItem('customerRoleId');
                      localStorage.removeItem('customerProfile');
                      socket.close();
                      history.push('/user/sign-in');
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <ButtonCustom
                  sx={{ color: hasHomePage ? '#fff' : '#202020' }}
                  variant="text"
                  onClick={() => {
                    history.push('/user/sign-in');
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <PeopleOutlineIcon sx={{ fontSize: 16, color: '#fff' }} />
                    <MenuTypo ml={0.5}>Sign in</MenuTypo>
                  </Box>
                </ButtonCustom>
                <ButtonCustom
                  sx={{ color: hasHomePage ? '#fff' : '#202020' }}
                  variant="text"
                  onClick={() => {
                    history.push('/user/sign-up');
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <PeopleOutlineIcon sx={{ fontSize: 16, color: '#fff' }} />
                    <MenuTypo ml={0.5}>Sign up</MenuTypo>
                  </Box>
                </ButtonCustom>
              </>
            )}

            <Box>
              <Tooltip title="Menu">
                <IconButton
                  onClick={handleMenuClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openMenu ? 'account-menu1' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
                >
                  <MenuIcon sx={{ width: 32, height: 32, color: '#fff' }} />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorElMenu}
              id="account-menu1"
              open={openMenu}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                onClick={() => {
                  history.push('/user/homepage');
                }}
              >
                HOME
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push('/user/shoes/shops');
                }}
              >
                SHOP
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push('/user/contact-us');
                }}
              >
                CONTACT US
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </NavWrapperBox>
  );
};

export default MobileNav;
