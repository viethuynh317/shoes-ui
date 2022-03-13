/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoeList } from '../../../../../commons/shoesSlice';
import ProductCard from '../../../../../components/Customer/ProductCard/ProductCard';

const CustomDivider = styled(Typography)(() => ({
  display: 'inline-block',
  width: '100%',
  borderBottom: '0.5px solid #CECECE',
  marginBottom: 16,
}));

const NewArrivalProduct = ({ title }) => {
  const { actionStatus } = useSelector((state) => state.customer);
  const [shoeList, setShoeList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getShoeList = async () => {
      const data = await dispatch(
        fetchShoeList({
          page: 1,
          perPage: 8,
        })
      );
      setShoeList(data?.payload?.data?.result || []);
    };

    getShoeList();
  }, [actionStatus]);
  return (
    <>
      <Box display="flex">
        <Typography
          component="span"
          variant="button"
          sx={{
            fontSize: 20,
            fontWeight: 500,
            display: 'inline-block',
            width: 300,
            textAlign: 'start',
          }}
          justifySelf="flex-end"
        >
          {title}
        </Typography>
        <CustomDivider component="span"></CustomDivider>
      </Box>
      <Box mt={4} mb={8}>
        <Grid container spacing={2}>
          {shoeList.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={3} lg={3} xl={2}>
              <ProductCard key={item._id} {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default NewArrivalProduct;
