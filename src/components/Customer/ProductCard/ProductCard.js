/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { orangeColor } from '../../../constants/globalConst';
import ProductDetailPopup from '../ProductDetailPopup/ProductDetailPopup';

const CardImage = styled(Box)(() => ({
  overflow: 'hidden',
  filter: 'brightness(100%)',
  transition: 'all 0.4s ease',
  '& > img': {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transform: 'scale(0.75)',
    borderRadius: 8,
  },
  '&:hover > img': {
    transform: 'scale(0.9)',
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0,0,0,0.35)',
    backgroundPosition: 'center',
  },
  '&:hover': {
    filter: 'brightness(80%)',
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

const ProductCard = (props) => {
  const { name, imageUrl, unitPrice, numOfStars, className } = props;
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={className || ''}>
        <CardImage height={300}>
          <img src={imageUrl} />
        </CardImage>
        <CardContent sx={{ height: 100 }}>
          <NameTypo gutterBottom variant="body1" component="div">
            {name}
          </NameTypo>
          <Typography variant="body2" gutterBottom>
            <Rating name="read-only" value={numOfStars} readOnly size="small" />
          </Typography>
          <Typography
            component="div"
            variant="body1"
            fontWeight={700}
            fontSize={19}
          >
            {unitPrice.toLocaleString('vi-VN')}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Tooltip title="Add to cart">
            <CustomIconBtn>
              <ShoppingCartOutlinedIcon />
            </CustomIconBtn>
          </Tooltip>
          <Tooltip title="Quick view">
            <CustomIconBtn
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              <SearchOutlinedIcon />
            </CustomIconBtn>
          </Tooltip>
          <Tooltip title="Compare">
            <CustomIconBtn>
              <LoopOutlinedIcon />
            </CustomIconBtn>
          </Tooltip>
          <Tooltip title="Wishlist">
            <CustomIconBtn>
              <FavoriteBorderOutlinedIcon />
            </CustomIconBtn>
          </Tooltip>
        </CardActions>
      </Card>
      <ProductDetailPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        data={props}
      />
    </>
  );
};

export default ProductCard;
