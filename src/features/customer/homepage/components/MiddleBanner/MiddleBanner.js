/* eslint-disable jsx-a11y/alt-text */
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CustomGrid = styled(Grid)(() => ({
  overflow: "hidden",
  "& > img": {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    transition: "all 0.4s ease",
    backgroundPosition: "center",
    backgroundSize: "cover",
    filter: "brightness(100%)",
  },
  "&:hover > img": {
    transform: "scale(1.15)",
    backgroundSize: "cover",
    backgroundColor: "rgba(0,0,0,0.35)",
    backgroundPosition: "center",
    filter: "brightness(80%)",
  },
}));

const MiddleBanner = () => {
  return (
    <Box my={8}>
      <Grid container>
        <CustomGrid item sm={12} md={4}>
          <img src="https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/shoes-banner-4.jpg" />
        </CustomGrid>
        <Grid item sm={12} md={4}>
          <Box sx={{ height: "100%" }}>
            <img
              src="https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/shoes-banner-5.jpg"
              style={{ height: "100%", width: "100%" }}
            />
          </Box>
        </Grid>
        <CustomGrid item sm={12} md={4}>
          <img src="https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/shoes-banner-6.jpg" />
        </CustomGrid>
      </Grid>
    </Box>
  );
};

export default MiddleBanner;
