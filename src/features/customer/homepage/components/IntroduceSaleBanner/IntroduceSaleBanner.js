/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Grid } from "@mui/material";
import React from "react";
import { introduceSaleBanner } from "../../../../../constants/customer/homePage";

const IntroduceSaleBanner = () => {
  return (
    <Grid container>
      {introduceSaleBanner.map((item) => (
        <Grid item key={item.id} sm={1} md={4}>
          <img src={item.image} alt={`image${item.id}`} />
        </Grid>
      ))}
    </Grid>
  );
};

export default IntroduceSaleBanner;
