/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
// import { getFoods } from './productSlice';
import Header from './HeaderProductManagement';
import Notification from '../../components/Notification';
// import { socket } from '../../../helper/socketIo';
import Pagination from '@mui/lab/Pagination';
import slugify from 'slugify';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { fetchShoeList } from '../../commons/shoesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '30px 0',
    overflow: 'hidden',
  },
  pagination: {
    marginTop: '20px',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function ListProduct() {
  const [shoeList, setShoeList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { filter, actionStatus } = useSelector((state) => state.shoes);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCall, setIsCall] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  useEffect(() => {
    const getShoeList = async () => {
      const res = await dispatch(
        fetchShoeList({
          page: currentPage,
          perPage: 6,
          search: filter?.search,
          isConfirmed: filter?.isConfirmed,
          unitPrice: filter?.unitPrice,
        })
      );
      setShoeList(res?.payload?.data?.result || []);
      setTotalPage(Math.ceil(res?.payload?.data?.total / 6));
    };
    getShoeList();
    setIsCall(true);
  }, [filter?.search, filter?.isConfirmed, filter?.unitPrice, currentPage]);
  // useEffect(() => {
  //   if (isCall && actionStatus) {
  //     setNotify({
  //       isOpen: true,
  //       message: actionStatus.msg,
  //       type:
  //         actionStatus.status === 200 ||
  //         actionStatus.status === 201 ||
  //         actionStatus.status === 202 ||
  //         actionStatus.status === 203 ||
  //         actionStatus.status === 204
  //           ? 'success'
  //           : 'error',
  //     });
  //   }
  // }, [actionStatus, isCall]);

  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <Header />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={6}>
            {shoeList.map((product, index) => (
              <Grid key={index} item>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          pacing={6}
          className={classes.pagination}
        >
          {totalPage > 0 ? (
            <Pagination
              count={totalPage}
              shape="rounded"
              onChange={handleChangePage}
            />
          ) : (
            'Không có sản phẩm'
          )}
        </Grid>
        <Notification notify={notify} setNotify={setNotify} />
      </Grid>
    </>
  );
}
