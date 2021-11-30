/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../../../../../components/Customer/ProductCard/ProductCard";
import { fetchShoeList } from "../../homePageSlice";
import { fakeData } from "../IntroduceProduct/IntroduceProduct";

const CustomDivider = styled(Typography)(() => ({
  display: "inline-block",
  width: "100%",
  borderBottom: "0.5px solid #CECECE",
  marginBottom: 16,
}));

const NewArrivalProduct = () => {
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
  }, []);
  return (
    <>
      <Box display="flex">
        <Typography
          component="span"
          variant="button"
          sx={{
            fontSize: 30,
            fontWeight: 500,
            display: "inline-block",
            width: 300,
            textAlign: "start",
          }}
          justifySelf="flex-end"
        >
          new arrival
        </Typography>
        <CustomDivider component="span"></CustomDivider>
      </Box>
      <Box mt={4} mb={8}>
        <Grid container spacing={2}>
          {shoeList.map((item) => (
            <Grid key={item.id} item xl={12} sm={6} md={3}>
              <ProductCard key={item.id} {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default NewArrivalProduct;
