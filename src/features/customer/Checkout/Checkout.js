/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { getAllCarts } from '../../../commons/cartSlice';
import BannerPage from '../../../components/BannerPage/BannerPage';
import ConfirmDialog from '../../../components/ConfirmDialog';
import Footer from '../../../components/Customer/Footer/Footer';
import MobileNav from '../../../components/Customer/Header/MobileNav/MobileNav';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import Notification from '../../../components/Notification';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import { purchaseOrder } from '../customerSlice';

const HomePageMain = styled(Box)(({ theme, sizeWidth }) => {
  return {
    margin:
      sizeWidth > 992
        ? '4rem 7.5rem 2rem'
        : sizeWidth <= 992 && sizeWidth > 786
        ? '4rem 4rem 2rem'
        : '4rem 1.5rem 2rem',
  };
});

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
  textDecoration: 'none',
}));

const schema = yup.object().shape({}).required();

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [carts, setCarts] = useState([]);
  const { actionStatus } = useSelector((state) => state.customer);
  const { actionStatus: actionStatusCart } = useSelector((state) => state.cart);
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const total = carts
    ? carts?.reduce(
        (result, cart) =>
          result +
          cart?.unitPrice * cart?.quantity -
          Math.round(
            (cart?.unitPrice * cart?.quantity * cart?.discountOff) / 100
          ),
        0
      )
    : 0;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    const fetchCarts = async () => {
      const res = await dispatch(getAllCarts({ page: 1, perPage: 999999 }));
      setCarts(res?.payload?.cartItems);
    };
    fetchCarts();
    setIsCall(true);
  }, [dispatch, confirmDialog, actionStatusCart]);

  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    if (isCall && actionStatus) {
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
    }
  }, [actionStatus, isCall]);

  useEffect(() => {
    if (isCall && actionStatusCart) {
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
    }
  }, [actionStatusCart, isCall]);

  const breadcrumbs = [
    <BreadCrumbLink key="1" to="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      Checkout
    </Typography>,
  ];

  const handleCheckoutSubmit = async (values) => {
    const cartItems = carts?.map((cart) => cart?._id);
    const data = {
      address: values?.address,
      cartItems,
      paymentMethod: 'COD',
      shipmentFee: 0,
      merchandiseSubtotal: total,
    };
    const {
      payload: { orderId },
    } = await dispatch(purchaseOrder(data));

    history.push(`/user/checkout/order-received/${orderId}`);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        {width > 768 ? (
          <>
            <Navbar sizeWidth={width} />
            <Nav sizeWidth={width} />
          </>
        ) : (
          <MobileNav sizeWidth={width} />
        )}
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="checkout" />
      <HomePageMain sizeWidth={width}>
        <Box component="form" onSubmit={handleSubmit(handleCheckoutSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <Box mb={2}>
                <Typography fontSize={22} fontWeight={600} textAlign="left">
                  BILLING DETAILS
                </Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <TextField
                  required
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  margin="normal"
                  {...register('fullName')}
                />
              </Box>

              <Box className="content">
                <TextField
                  required
                  name="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register('email')}
                />
              </Box>

              <Box>
                <TextField
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  {...register('phoneNumber')}
                />
              </Box>

              <Box>
                <TextField
                  required
                  name="address"
                  label="Address"
                  fullWidth
                  margin="normal"
                  {...register('address')}
                />
              </Box>
              <Box>
                <TextField
                  name="orderNotes"
                  label="Order notes (optional)"
                  fullWidth
                  margin="normal"
                  {...register('orderNotes')}
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              sx={{ textAlign: 'left' }}
            >
              <Card
                sx={{ marginTop: width > 1200 ? '48px' : '0px', width: '100%' }}
              >
                <CardHeader
                  title={
                    <>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 700 }}
                        color="text.secondary"
                      >
                        YOUR ORDER
                      </Typography>
                    </>
                  }
                />
                <Divider />
                <CardContent>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          PRODUCT
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          DISCOUNT OFF
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>PRICE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carts.map((cart, index) => (
                        <TableRow key={cart?._id}>
                          <TableCell
                            {...(index + 1 !== carts.length
                              ? { sx: { borderBottom: 'none' } }
                              : {})}
                          >
                            {cart?.name}{' '}
                            <Typography component="span" fontWeight={600}>
                              x {cart?.quantity}
                            </Typography>
                          </TableCell>
                          <TableCell
                            {...(index + 1 !== carts.length
                              ? { sx: { borderBottom: 'none' } }
                              : {})}
                          >
                            <Typography component="span">
                              {cart?.discountOff}%
                            </Typography>
                          </TableCell>
                          <TableCell
                            {...(index + 1 !== carts.length
                              ? { sx: { borderBottom: 'none' } }
                              : {})}
                          >
                            {cart?.unitPrice?.toLocaleString('vi')}
                            <small>VND</small>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 700 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Subtotal:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 700 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {total?.toLocaleString('vi')}
                            <small>VND</small>
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 700 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Shipping:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <FormControl component="fieldset">
                            <RadioGroup defaultValue={0} name="shopping">
                              <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label="Free shipping"
                              />
                            </RadioGroup>
                          </FormControl>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 700 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Total:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 700 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {total?.toLocaleString('vi')}
                            <small>VND</small>
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardActions>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                  >
                    <Button
                      type="submit"
                      size="small"
                      variant="outlined"
                      color="warning"
                      sx={{ width: '80%' }}
                    >
                      Place Order
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </HomePageMain>
      <Box mt={8}>
        <Footer />
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Checkout;
