/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Box,
  Rating,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addCartAndDelete,
  clearActionStatusCart,
} from '../../../commons/cartSlice';
import BannerPage from '../../../components/BannerPage/BannerPage';
import ConfirmDialog from '../../../components/ConfirmDialog';
import Controls from '../../../components/controls/Controls';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import Notification from '../../../components/Notification';
import useTable from '../../../hooks/customHooks/useTable';
import {
  clearActionStatus,
  deleteWishlist,
  getAllWishlist,
} from '../customerSlice';

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '4rem 7.5rem 2rem',
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
  { id: 'discountOff', label: 'Discount Off', disableSorting: true },
  { id: 'gender', label: 'Stars', disableSorting: true },
  { id: 'type', label: 'Shoe Type', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const Wishlist = ({ children }) => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const { actionStatus } = useSelector((state) => state.customer);
  const { actionStatus: actionStatusCart } = useSelector((state) => state.cart);

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
    const fetchWishlist = async () => {
      const res = await dispatch(getAllWishlist({ page: 1, perPage: 5 }));
      setWishlist(res?.payload?.wishlist);
    };
    fetchWishlist();
    setIsCall(true);
  }, [dispatch, confirmDialog, actionStatusCart]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(wishlist, headCells, {
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
    dispatch(deleteWishlist({ shoeId: id }));
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

  const handleAddCart = (id) => {
    dispatch(clearActionStatus());
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(
      addCartAndDelete({ shoeId: id, data: { cartItems: { [id]: 1 } } })
    );
  };

  const breadcrumbs = [
    <BreadCrumbLink key="1" to="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      Wishlist
    </Typography>,
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Navbar />
        <Nav />
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="wishlist" />
      <HomePageMain>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, ind) => (
              <TableRow key={item._id}>
                <TableCell>{ind + 1}</TableCell>
                <TableCell>
                  <img src={item?.imageUrl} alt="img" height={80} width={80} />
                </TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.unitPrice}</TableCell>
                <TableCell>{item?.discountOff}%</TableCell>
                <TableCell>
                  <Rating size="small" value={item?.numOfStars} readOnly />
                </TableCell>
                <TableCell>{item?.typeId}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      handleAddCart(item?._id);
                    }}
                  >
                    <ShoppingCartOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          handleDelete(item?._id);
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

export default Wishlist;
