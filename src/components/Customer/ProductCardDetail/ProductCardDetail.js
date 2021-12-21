/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addCart } from '../../../commons/cartSlice';
import { orangeColor } from '../../../constants/globalConst';

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

const schema = yup.object().shape({}).required();

const ProductCardDetail = (props) => {
  const { id, name, imageUrl, unitPrice, numOfStars, description } = props;
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  const { register, handleSubmit, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { userId } = JSON.parse(localStorage.getItem('customerProfile'));

  const handleFormSubmit = async (data) => {
    const submitData = {
      cartItems: {
        [id]: +data?.quantity,
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
  return (
    <>
      <Grid container spacing={4}>
        <Grid item sx={12} sm={12} md={5} lg={5} xl={6}>
          <CardImage>
            <img
              src={imageUrl}
              alt="shoe-img"
              style={{ width: '100%' }}
              height={350}
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
            <Typography variant="h6" fontWeight={600}>
              {name}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body2" gutterBottom>
              <Rating
                name="read-only"
                value={numOfStars}
                readOnly
                size="small"
              />
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle2" align="left" color="#848484">
              {description}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle1" color="#848484">
              Price: &nbsp;
              <span style={{ fontWeight: 600, color: '#000' }}>
                {unitPrice} VND
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
            <CustomIconBtn>
              <FavoriteBorderOutlinedIcon />
            </CustomIconBtn>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductCardDetail;
