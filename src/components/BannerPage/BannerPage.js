import { Box, Breadcrumbs, styled, Typography } from '@mui/material';
import React from 'react';

const BannerBox = styled(Box)(() => ({
  height: 250,
  backgroundImage:
    'url(https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/themes/boxshop/images/bg_breadcrumb_v1.jpg)',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

const TypoText = styled(Typography)(() => ({
  color: '#fff',
}));

const BannerPage = ({ breadcrumbs, title }) => {
  return (
    <BannerBox>
      <Box display="block">
        <TypoText variant="button" fontWeight={600} fontSize={32}>
          {title}
        </TypoText>
      </Box>
      <Box>
        <Breadcrumbs
          sx={{ color: '#fff' }}
          separator="›"
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
    </BannerBox>
  );
};

export default BannerPage;
