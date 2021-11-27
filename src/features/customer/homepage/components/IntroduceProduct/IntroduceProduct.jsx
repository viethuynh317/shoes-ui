import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../../../../components/Customer/ProductCard/ProductCard";
import { orangeColor } from "../../../../../constants/globalConst";

const useStyles = makeStyles(() => ({
  spacingCard: {
    margin: "0 8px",
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SaleBox = styled(Box)(() => ({
  border: "1px solid #84848466",
}));

const SaleBtn = styled(Button)(() => ({
  margin: "0 8px",
  borderColor: "#84848466",
  color: "#000",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: orangeColor,
    color: "#fff",
    borderColor: orangeColor,
    transition: "all .3s ease-in-out",
  },
}));

const setShoes = (
  id,
  name,
  imageUrl,
  unitPrice,
  discountOff,
  description,
  rating
) => ({
  id,
  name,
  imageUrl,
  unitPrice,
  discountOff,
  description,
  rating,
});

export const fakeData = [
  setShoes(
    "1",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/12-380x434.jpg",
    200000,
    0,
    "Adidas shoes 1",
    1
  ),
  setShoes(
    "2",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/10-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    2
  ),
  setShoes(
    "3",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/18-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    3
  ),
  setShoes(
    "4",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/02-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    4
  ),
  setShoes(
    "5",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/01-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    2
  ),
  setShoes(
    "6",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/03-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    5
  ),
  setShoes(
    "7",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/16-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    4
  ),
  setShoes(
    "7",
    "Adidas shoes 1",
    "https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/05/17-380x434.jpg",
    300000,
    0,
    "Adidas shoes 1",
    4
  ),
];

const IntroduceProduct = () => {
  const classes = useStyles();

  return (
    <Box>
      <SaleBox p={1} mx={1} mt={8}>
        <Box display="flex" justifyContent="flex-start">
          <SaleBtn variant="outlined">best selling</SaleBtn>
          <SaleBtn variant="outlined">featured products</SaleBtn>
          <SaleBtn variant="outlined">new arrivals</SaleBtn>
        </Box>
      </SaleBox>
      <Box mt={3}>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {fakeData.map((item) => (
            <ProductCard
              key={item.id}
              className={classes.spacingCard}
              {...item}
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default IntroduceProduct;
