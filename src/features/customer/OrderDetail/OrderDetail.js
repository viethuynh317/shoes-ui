/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import { getOrderByOrderId } from '../customerSlice';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import MobileNav from '../../../components/Customer/Header/MobileNav/MobileNav';

const HomePageMain = styled(Box)(({ theme, sizeWidth }) => ({
  margin:
    sizeWidth > 992
      ? '4rem 7.5rem 2rem'
      : sizeWidth <= 992 && sizeWidth > 786
      ? '4rem 4rem 2rem'
      : '4rem 1.5rem 2rem',
}));

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
  textDecoration: 'none',
}));

const OrderDetail = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [orders, setOrders] = useState({});
  const [width] = useWindowSize();

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
        {width > 768 ? (
          <>
            <Navbar sizeWidth={width} />
            <Nav sizeWidth={width} />
          </>
        ) : (
          <MobileNav sizeWidth={width} />
        )}
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="order received" />
      <HomePageMain sizeWidth={width}>
        <Box>
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
                          {cart?.unitPrice?.toLocaleString('vi')}
                          <small>VND</small>
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
                          {(
                            cart?.unitPrice * cart?.quantity -
                            Math.round(
                              cart?.unitPrice *
                                cart?.quantity *
                                (cart?.discountOff / 100)
                            )
                          )?.toLocaleString('vi')}
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
                    {orders?.total?.toLocaleString('vi') || 0}
                    <small>VND</small>
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
                    {orders?.total?.toLocaleString('vi') || 0}
                    <small>VND</small>
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

export default OrderDetail;
