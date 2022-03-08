/* eslint-disable jsx-a11y/img-redundant-alt */
import { Grid } from '@mui/material';
import React from 'react';
import { introduceSaleBanner } from '../../../../../constants/customer/homePage';

const IntroduceSaleBanner = () => {
  return (
    <Grid container spacing={2}>
      {introduceSaleBanner.map((item) => (
        <Grid item key={item.id} xs={12} sm={4} md={4} lg={4} width="100%">
          <img src={item.image} alt={`image${item.id}`} width="100%" />
        </Grid>
      ))}
    </Grid>
  );
};

export default IntroduceSaleBanner;
