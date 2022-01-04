import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { orangeColor } from '../../../../constants/globalConst';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWishlist } from '../../../../features/customer/customerSlice';
import { getAllCarts } from '../../../../commons/cartSlice';

const CartBox = styled(Box)(({ theme }) => ({
  backgroundColor: orangeColor,
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
  '&:hover': {
    backgroundColor: `${orangeColor}cc`,
    transition: 'all 0.3s ease-in-out',
  },
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  mr: 1,
  textTransform: 'none',
  '&:hover': {
    color: orangeColor,
    transition: 'all 0.3s ease-in-out',
  },
}));

const MenuTypo = styled(Typography)(({ theme }) => ({
  fontSize: 15,
}));

const Navbar = ({ hasHomePage }) => {
  const { actionStatus } = useSelector((state) => state.customer);
  const { actionStatus: actionStatusCart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const [wishlistTotal, setWishlistTotal] = useState(0);
  const [cartInfo, setCartInfo] = useState({});
  const hasLogin = !!localStorage.getItem('customerToken');

  useEffect(() => {
    const fetchAllWishlist = async () => {
      const res = await dispatch(getAllWishlist({ page: 1, perPage: 5 }));
      setWishlistTotal(res?.payload?.total);
    };
    fetchAllWishlist();
  }, [dispatch, actionStatus]);

  useEffect(() => {
    const fetchAllCart = async () => {
      const resCart = await dispatch(getAllCarts({ page: 1, perPage: 5 }));
      setCartInfo({
        total: resCart?.payload?.total,
        priceTotal: resCart?.payload?.priceTotal,
      });
    };
    fetchAllCart();
  }, [dispatch, actionStatusCart]);

  return (
    <Box
      display="flex"
      mx={20}
      justifyContent="space-between"
      sx={{ height: '100%' }}
    >
      <Box display="flex" alignItems="center">
        <LocalPhoneIcon
          color="action"
          sx={{ fontSize: 16, color: hasHomePage ? '#fff' : '#202020' }}
        />
        <Typography
          variant="subtitle2"
          ml={1}
          sx={{ letterSpacing: 2, color: hasHomePage ? '#fff' : '#202020' }}
        >
          033 8948317
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <ButtonCustom
          variant="text"
          sx={{ color: hasHomePage ? '#fff' : '#202020' }}
          onClick={() => {
            history.push('/user/wishlist');
          }}
        >
          <Box display="flex" alignItems="center">
            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
            <MenuTypo ml={0.5}>Wishlist ({wishlistTotal || 0})</MenuTypo>
          </Box>
        </ButtonCustom>
        {hasLogin ? (
          <>
            <ButtonCustom
              sx={{ color: hasHomePage ? '#fff' : '#202020' }}
              variant="text"
              onClick={() => {
                history.push('/user/my-account/details');
              }}
            >
              <Box display="flex" alignItems="center">
                <PeopleOutlineIcon sx={{ fontSize: 16 }} />
                <MenuTypo ml={0.5}>My account</MenuTypo>
              </Box>
            </ButtonCustom>
            <ButtonCustom
              sx={{ color: hasHomePage ? '#fff' : '#202020' }}
              variant="text"
              onClick={() => {
                localStorage.removeItem('customerToken');
                localStorage.removeItem('customerRefreshToken');
                localStorage.removeItem('customerRoleId');
                localStorage.removeItem('customerProfile');
                history.push('/user/sign-in');
              }}
            >
              <Box display="flex" alignItems="center">
                <LogoutIcon sx={{ fontSize: 16 }} />
                <MenuTypo ml={0.5}>Logout</MenuTypo>
              </Box>
            </ButtonCustom>
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
                <PeopleOutlineIcon sx={{ fontSize: 16 }} />
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
                <PeopleOutlineIcon sx={{ fontSize: 16 }} />
                <MenuTypo ml={0.5}>Sign up</MenuTypo>
              </Box>
            </ButtonCustom>
          </>
        )}
        <CartBox display="flex" alignItems="center" py={1.5} px={2} ml={2}>
          <ShoppingCartOutlinedIcon />
          <Typography ml={1}>
            {cartInfo?.total || 0} items -{' '}
            <Typography component="span" fontWeight={700}>
              {cartInfo?.priceTotal || 0} <small>VND</small>
            </Typography>
          </Typography>
        </CartBox>
      </Box>
    </Box>
  );
};

export default Navbar;
