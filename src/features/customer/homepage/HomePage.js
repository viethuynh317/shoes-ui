import React from 'react';
import Header from '../../../components/Customer/Header/Header';
import { Carousel } from 'react-carousel-minimal';
import { sliderData } from '../../../constants/customer/homePage';
import { styled } from '@mui/styles';
import '../../../App.css';
import { Box } from '@mui/system';
import './homepage.css';
import IntroduceSaleBanner from './components/IntroduceSaleBanner/IntroduceSaleBanner';
import IntroduceProduct from './components/IntroduceProduct/IntroduceProduct';
import MiddleBanner from './components/MiddleBanner/MiddleBanner';
import NewArrivalProduct from './components/NewArrivalProduct/NewArrivalProduct';
import ProductIntroduceVideo from './components/ProductIntroduceVideo/ProductIntroduceVideo';
import NewsLetter from './components/NewsLetter/NewsLetter';
import Footer from '../../../components/Customer/Footer/Footer';

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

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '2rem 7.5rem',
}));

const HomePage = () => {
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
        <HomePageMain>
          <IntroduceSaleBanner />
          <IntroduceProduct />
        </HomePageMain>
        <MiddleBanner />
        <Box mx={15.5} mb={5}>
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
    </>
  );
};

export default HomePage;
