/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import { getOrderByOrderId } from '../customerSlice';

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '4rem 7.5rem 2rem',
}));

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
  textDecoration: 'none',
}));

const OrderReceived = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await dispatch(getOrderByOrderId(params?.id));
      setOrders(res?.payload);
    };
    fetchOrders();
  }, [dispatch]);

  const breadcrumbs = [
    <BreadCrumbLink key="1" to="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      Order Received
    </Typography>,
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Navbar />
        <Nav />
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="order received" />
      <HomePageMain>
        <Box>
          <Typography textAlign="left">
            Thank you. Your order has been received.
          </Typography>
        </Box>
        <Box mt={4}>
          <Grid container>
            <Grid item xs={12} sm={6} md pl={3} pr={3}>
              <Box>
                <Typography textAlign="left" fontSize={14} color="#9A9A9A">
                  Order ID:
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{ fontSize: 16, fontWeight: 700 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {orders?._id}
                </Typography>
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={6} md pl={3} pr={3}>
              <Box>
                <Typography textAlign="left" fontSize={14} color="#9A9A9A">
                  Date:
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{ fontSize: 16, fontWeight: 700 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {orders?.createdAt
                    ? moment(orders?.createdAt).format('MM/DD/YYYY')
                    : moment(orders?.createdAt).format('MM/DD/YYYY')}
                </Typography>
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={6} md pl={3} pr={3}>
              <Box>
                <Typography textAlign="left" fontSize={14} color="#9A9A9A">
                  Address:
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{ fontSize: 16, fontWeight: 700 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {orders?.address}
                </Typography>
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={6} md pl={3} pr={3}>
              <Box>
                <Typography textAlign="left" fontSize={14} color="#9A9A9A">
                  Total:
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{ fontSize: 16, fontWeight: 700 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {orders?.total}
                </Typography>
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={6} md pl={3} pr={3}>
              <Box>
                <Typography textAlign="left" fontSize={14} color="#9A9A9A">
                  Payment Method:
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{ fontSize: 16, fontWeight: 700 }}
                  color="text.secondary"
                  gutterBottom
                >
                  COD
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={6}>
          <Box mb={3}>
            <Typography textAlign="left" fontSize={25} fontWeight={600}>
              Order details
            </Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>PRODUCT</TableCell>
                <TableCell style={{ fontWeight: 600 }}>PRICE</TableCell>
                <TableCell style={{ fontWeight: 600 }}>DISCOUNT OFF</TableCell>
                <TableCell style={{ fontWeight: 600 }}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.orderItems
                ? orders?.orderItems.map((cart, index) => (
                    <TableRow key={cart?._id}>
                      <TableCell
                        {...(index + 1 !== orders?.orderItems.length
                          ? { sx: { borderBottom: 'none' } }
                          : {})}
                      >
                        <Typography
                          sx={{ fontSize: 14, fontWeight: 700 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {cart?.name}{' '}
                        </Typography>
                        <Typography component="span" fontWeight={600}>
                          x {cart?.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell
                        {...(index + 1 !== orders?.orderItems.length
                          ? { sx: { borderBottom: 'none' } }
                          : {})}
                      >
                        <Typography
                          sx={{ fontSize: 14, fontWeight: 700 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {cart?.unitPrice} <small>VND</small>
                        </Typography>
                      </TableCell>
                      <TableCell
                        {...(index + 1 !== orders?.orderItems.length
                          ? { sx: { borderBottom: 'none' } }
                          : {})}
                      >
                        <Typography
                          sx={{ fontSize: 14, fontWeight: 700 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {cart?.discountOff} <small>%</small>
                        </Typography>
                      </TableCell>
                      <TableCell
                        {...(index + 1 !== orders?.orderItems.length
                          ? { sx: { borderBottom: 'none' } }
                          : {})}
                      >
                        <Typography
                          sx={{ fontSize: 14, fontWeight: 700 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {cart?.unitPrice * cart?.quantity -
                            Math.round(
                              cart?.unitPrice *
                                cart?.quantity *
                                (cart?.discountOff / 100)
                            )}{' '}
                          <small>VND</small>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
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
                    {orders?.total || 0} <small>VND</small>
                  </Typography>
                </TableCell>
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
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 700 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Free shipping
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 700 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Payment Method:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 700 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    COD
                  </Typography>
                </TableCell>
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
                    {orders?.total || 0} <small>VND</small>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </HomePageMain>
      <Box mt={8}>
        <Footer />
      </Box>
    </>
  );
};

export default OrderReceived;
