import { Box, Typography } from '@mui/material';
import React from 'react';
import MyAccount from '../../MyAccount';

const CustomerOrders = () => {
  return (
    <MyAccount>
      <Box>My Orders</Box>
      <Typography>Currently, There are no orders!</Typography>
    </MyAccount>
  );
};

export default CustomerOrders;
