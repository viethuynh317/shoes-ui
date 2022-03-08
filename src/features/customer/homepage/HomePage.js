/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-carousel-minimal';
import { useDispatch, useSelector } from 'react-redux';
import '../../../App.css';
import { clearActionStatusCart } from '../../../commons/cartSlice';
import Footer from '../../../components/Customer/Footer/Footer';
import Header from '../../../components/Customer/Header/Header';
import Notification from '../../../components/Notification';
import { sliderData } from '../../../constants/customer/homePage';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import { clearActionStatus } from '../customerSlice';
import IntroduceProduct from './components/IntroduceProduct/IntroduceProduct';
import IntroduceSaleBanner from './components/IntroduceSaleBanner/IntroduceSaleBanner';
import MiddleBanner from './components/MiddleBanner/MiddleBanner';
import NewArrivalProduct from './components/NewArrivalProduct/NewArrivalProduct';
import NewsLetter from './components/NewsLetter/NewsLetter';
import ProductIntroduceVideo from './components/ProductIntroduceVideo/ProductIntroduceVideo';
import './homepage.css';

const captionStyle = {
  fontWeight: 'bold',
  right: 400,
  bottom: 200,
  color: '#fff',
};

const CarouselCustom = styled(Carousel)(({ theme }) => ({}));
const HomePageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const HomePageMain = styled(Box)(({ theme, sizeWidth }) => ({
  margin:
    sizeWidth > 992
      ? '4rem 7.5rem'
      : sizeWidth <= 992 && sizeWidth > 786
      ? '4rem 4rem'
      : '4rem 1.5rem',
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const { actionStatus } = useSelector((state) => state.customer);
  const { actionStatus: actionStatusCart } = useSelector((state) => state.cart);

  const [width] = useWindowSize();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

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
  }, [actionStatusCart, actionStatusCart]);

  return (
    <>
      <HomePageWrapper>
        <Header />
        <CarouselCustom
          data={sliderData}
          time={3000}
          width="100vw"
          height="110vh"
          captionStyle={captionStyle}
          captionPosition="bottom"
          dots={true}
          automatic={true}
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          style={{
            maxWidth: '100vw',
            maxHeight: '110vh',
          }}
          showNavBtn={false}
        />
        <HomePageMain sizeWidth={width}>
          <IntroduceSaleBanner />
          <IntroduceProduct />
        </HomePageMain>
        <MiddleBanner />
        <Box
          mx={width > 992 ? 15.5 : width <= 992 && width > 786 ? 8 : 4}
          mb={5}
        >
          <NewArrivalProduct title="new arrival" />
        </Box>
        <Box mt={3} mb={8}>
          <ProductIntroduceVideo />
        </Box>
        <Box mb={8}>
          <NewsLetter />
        </Box>
        <Box mt={8}>
          <Footer />
        </Box>
      </HomePageWrapper>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default HomePage;
