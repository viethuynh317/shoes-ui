import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Box,
  Rating,
  ButtonGroup,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles, styled } from '@mui/styles';
import Controls from '../../controls/Controls';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { orangeColor } from '../../../constants/globalConst';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../commons/cartSlice';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
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

export default function ProductDetailPopup(props) {
  const { data, openPopup, setOpenPopup } = props;
  const dispatch = useDispatch();

  const classes = useStyles();
  const { id, name, imageUrl, unitPrice, numOfStars, description } = data;
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
    setOpenPopup(false);
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
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Box display="flex">
          <Typography
            variant="button"
            fontWeight={600}
            fontSize={18}
            style={{ flexGrow: 1 }}
          >
            Shoe Detail
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item sx={12} sm={12} md={5} lg={5} xl={6}>
            <img
              src={imageUrl}
              alt="shoe-img"
              style={{ width: '100%' }}
              height={350}
            />
          </Grid>
          <Grid item sx={12} sm={12} md={7} lg={7} xl={6}>
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
              <Typography variant="subtitle2" color="#848484">
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
      </DialogContent>
    </Dialog>
  );
}
