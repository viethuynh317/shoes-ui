/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Link,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { addCart, clearActionStatusCart } from '../../../commons/cartSlice';
import { fetchShoeById } from '../../../commons/shoesSlice';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import Notification from '../../../components/Notification';
import { orangeColor } from '../../../constants/globalConst';
import { clearActionStatus, updateWishlist } from '../customerSlice';
import NewArrivalProduct from '../homepage/components/NewArrivalProduct/NewArrivalProduct';
import ProductReview from './components/ProductReview/ProductReview';

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '4rem 7.5rem 2rem',
}));

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
}));

const CardImage = styled(Box)(() => ({
  overflow: 'hidden',
  filter: 'brightness(100%)',
  transition: 'all 0.4s ease',
  '& > img': {
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 8,
    transform: 'scale(0.9)',
  },
}));

const CustomIconBtn = styled(IconButton)(() => ({
  '&:hover': {
    transition: 'all 0.3s ease-in-out',
    backgroundColor: orangeColor,
    color: '#fff',
  },
}));

const NameTypo = styled(Typography)(() => ({
  cursor: 'pointer',
  '&:hover': {
    color: orangeColor,
    transition: 'all 0.3s ease-in-out',
  },
}));

const schema = yup.object().shape({}).required();

const ProductDetail = ({ children }) => {
  const [shoe, setShoe] = useState({});
  const { actionStatus } = useSelector((state) => state.customer);
  const { actionStatus: actionStatusCart } = useSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShoeDetailById = async () => {
      try {
        const res = await dispatch(fetchShoeById(id));
        setShoe(res?.payload?.data?.shoe);
      } catch (error) {}
    };
    fetchShoeDetailById();
  }, [dispatch, id]);

  const [counter, setCounter] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const { register, handleSubmit, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { userId } = JSON.parse(localStorage.getItem('customerProfile'));

  const handleFormSubmit = async (data) => {
    const submitData = {
      cartItems: {
        [shoe?._id]: +data?.quantity,
      },
    };

    await dispatch(addCart({ userId, data: submitData }));
    setCounter(0);
  };

  const handleIncrement = () => {
    setCounter((prev) => +prev + 1);
    setValue('quantity', +counter + 1);
  };

  const handleDecrement = () => {
    setCounter((prev) => +prev - 1);
    setValue('quantity', +counter - 1);
  };

  const handleCounterChange = (e) => {
    setCounter(+e.target.value);
  };

  const displayCounter = counter > 0;

  const handleWishlistClick = async () => {
    await dispatch(updateWishlist({ userId, shoeId: id }));
  };

  useEffect(() => {
    dispatch(clearActionStatus());
    dispatch(clearActionStatusCart());
  }, []);

  useEffect(() => {
    dispatch(clearActionStatusCart());
    if (actionStatus) {
      setNotify({
        isOpen: true,
        message: actionStatus.msg,
        type:
          actionStatus.status === 200 ||
          actionStatus.status === 201 ||
          actionStatus.status === 202 ||
          actionStatus.status === 203 ||
          actionStatus.status === 204
            ? 'success'
            : 'error',
      });
      dispatch(clearActionStatus());
    }
  }, [actionStatus]);

  useEffect(() => {
    dispatch(clearActionStatus());
    if (actionStatusCart) {
      setNotify({
        isOpen: true,
        message: actionStatusCart.msg,
        type:
          actionStatusCart.status === 200 ||
          actionStatusCart.status === 201 ||
          actionStatusCart.status === 202 ||
          actionStatusCart.status === 203 ||
          actionStatusCart.status === 204
            ? 'success'
            : 'error',
      });
      dispatch(clearActionStatusCart());
    }
  }, [actionStatusCart]);

  const breadcrumbs = [
    <BreadCrumbLink underline="hover" key="1" href="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <BreadCrumbLink underline="hover" key="1" href="/user/shoes/shops">
      Shop
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      {shoe?.name}
    </Typography>,
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Navbar />
        <Nav />
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="shops" />
      <HomePageMain>
        <Grid container spacing={4}>
          <Grid item sx={12} sm={12} md={5} lg={5} xl={6}>
            <CardImage>
              <img
                src={shoe?.imageUrl}
                alt="shoe-img"
                height={500}
                width={500}
              />
            </CardImage>
          </Grid>
          <Grid
            item
            sx={12}
            sm={12}
            md={7}
            lg={7}
            xl={6}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box mb={1}>
              <NameTypo variant="h6" fontWeight={600}>
                {shoe?.name}
              </NameTypo>
            </Box>
            <Box mb={1}>
              <Typography variant="body2" gutterBottom>
                <Rating
                  name="read-only"
                  value={shoe?.numOfStars}
                  readOnly
                  size="small"
                />
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant="subtitle2" align="left" color="#848484">
                {shoe?.description}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant="subtitle1" color="#848484">
                Price: &nbsp;
                <span style={{ fontWeight: 600, color: '#848484' }}>
                  {shoe?.unitPrice} VND
                </span>
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant="subtitle1" color="#848484">
                Discount off: &nbsp;
                <span style={{ fontWeight: 600, color: '#848484' }}>
                  {shoe?.discountOff}%
                </span>
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant="subtitle1" color="#848484">
                Brand: &nbsp;
                <span style={{ fontWeight: 600, color: '#848484' }}>
                  {shoe?.typeId}
                </span>
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant="subtitle1" color="#848484">
                Gender: &nbsp;
                <span style={{ fontWeight: 600, color: '#848484' }}>
                  {shoe?.gender}
                </span>
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
              <ButtonGroup size="small">
                <Button onClick={handleDecrement} disabled={!displayCounter}>
                  -
                </Button>
                <TextField
                  size="small"
                  type="number"
                  sx={{ width: 70 }}
                  value={counter}
                  id="quantity"
                  {...register('quantity')}
                  onChange={handleCounterChange}
                  {...register}
                />
                <Button onClick={handleIncrement}>+</Button>
              </ButtonGroup>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<ShoppingCartOutlinedIcon />}
                sx={{ mx: 2 }}
              >
                add to cart
              </Button>
              <CustomIconBtn onClick={handleWishlistClick}>
                <FavoriteBorderOutlinedIcon />
              </CustomIconBtn>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <ProductReview shoe={shoe} />
        </Box>
      </HomePageMain>
      <Box mx={15.5} mb={5} mt={8}>
        <NewArrivalProduct title="you may also like…" />
      </Box>
      <Box mt={8}>
        <Footer />
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ProductDetail;
