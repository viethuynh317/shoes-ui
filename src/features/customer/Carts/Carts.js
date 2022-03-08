/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
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
  Rating,
  Table,
  TableBody,
  TableCell,
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
import {
  clearActionStatusCart,
  deleteCart,
  getAllCarts,
  updateCart,
} from '../../../commons/cartSlice';
import BannerPage from '../../../components/BannerPage/BannerPage';
import ConfirmDialog from '../../../components/ConfirmDialog';
import Controls from '../../../components/controls/Controls';
import Footer from '../../../components/Customer/Footer/Footer';
import MobileNav from '../../../components/Customer/Header/MobileNav/MobileNav';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import Notification from '../../../components/Notification';
import useTable from '../../../hooks/customHooks/useTable';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';
import NewArrivalProduct from '../homepage/components/NewArrivalProduct/NewArrivalProduct';

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

const headCells = [
  { id: '_id', label: 'Orders', disableSorting: true },
  { id: 'image', label: 'Image', disableSorting: true },
  { id: 'name', label: 'Shoe Name', disableSorting: true },
  { id: 'price', label: 'Unit Price', disableSorting: true },
  { id: 'quantity', label: 'Quantity', disableSorting: true },
  { id: 'discountOff', label: 'Discount Off', disableSorting: true },
  { id: 'total', label: 'Total', disableSorting: true },
  { id: 'stars', label: 'Stars', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const schema = yup.object().shape({}).required();

const Carts = ({ history }) => {
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(carts || [], headCells, {
      fn: (items) => {
        return items;
      },
    });

  const [isCall, setIsCall] = useState(false);

  const handleDelete = (id) => {
    dispatch(clearActionStatusCart());
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteCart(id));
  };

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
      Shopping Cart
    </Typography>,
  ];

  const handleCartSubmit = (data) => {
    dispatch(updateCart({ cartItems: data }));
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
      <BannerPage breadcrumbs={breadcrumbs} title="shopping cart" />
      <HomePageMain sizeWidth={width}>
        <Box component="form" onSubmit={handleSubmit(handleCartSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <Box display="flex" justifyContent="right">
                <Button type="submit" variant="outlined">
                  update cart
                </Button>
              </Box>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, ind) => (
                    <TableRow key={item._id}>
                      <TableCell>{ind + 1}</TableCell>
                      <TableCell>
                        <img
                          src={item?.imageUrl}
                          alt="img"
                          height={80}
                          width={80}
                        />
                      </TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>
                        {item?.unitPrice.toLocaleString('vi')}
                        <small>VND</small>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          InputProps={{ inputProps: { min: 0, max: 20 } }}
                          defaultValue={item?.quantity}
                          {...register(item?._id)}
                          name={item?._id}
                        />
                      </TableCell>
                      <TableCell>{item?.discountOff}%</TableCell>
                      <TableCell>
                        {(
                          item?.unitPrice * item?.quantity -
                          Math.round(
                            (item?.unitPrice *
                              item?.quantity *
                              item?.discountOff) /
                              100
                          )
                        ).toLocaleString('vi')}
                        <small>VND</small>
                      </TableCell>
                      <TableCell>
                        <Rating
                          size="small"
                          value={item?.numOfStars}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'Are you sure to delete this record?',
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                handleDelete(item?.shoeId);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={3}
              sx={{ textAlign: 'left' }}
            >
              <Card
                sx={{ marginTop: width > 1200 ? '60px' : '0px', width: '100%' }}
              >
                <CardHeader
                  title={
                    <>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 700 }}
                        color="text.secondary"
                      >
                        TOTAL CARTS
                      </Typography>
                    </>
                  }
                />
                <Divider />
                <CardContent>
                  <Table>
                    <TableBody>
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
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 700 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Shopping:
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
                      size="small"
                      variant="outlined"
                      color="warning"
                      sx={{ width: '80%' }}
                      onClick={() => {
                        history.push('/user/checkout');
                      }}
                    >
                      Proceed to checkout
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mt: '0.5rem', width: '80%' }}
                      onClick={() => {
                        history.push('/user/shoes/shops');
                      }}
                    >
                      Continue shopping
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </HomePageMain>
      <Box
        mx={width > 992 ? 15.5 : width <= 992 && width > 786 ? 8 : 4}
        mb={5}
        mt={8}
      >
        <NewArrivalProduct title="you may also like…" />
      </Box>
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

export default Carts;
