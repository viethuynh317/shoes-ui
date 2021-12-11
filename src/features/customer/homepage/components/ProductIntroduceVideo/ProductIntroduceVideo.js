/* eslint-disable jsx-a11y/iframe-has-title */
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const IntroduceVideoBox = styled(Box)(() => ({
  overflow: "hidden",
  background:
    "url(https://boxshop-be87.kxcdn.com/boxshop-shoes/wp-content/uploads/2017/03/bg-video.jpg?id=7271)",
  height: "100vh",
  width: "100%",
}));

const Iframe = styled("iframe")(() => ({
  width: "50%",
  height: "52%",
}));

const ProductIntroduceVideo = () => {
  return (
    <Box>
      <IntroduceVideoBox>
        <Box pt={12} sx={{ width: "100%", height: "100%" }}>
          <Box mb={4}>
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              video
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              political catalytic effect safety initiative
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Iframe
              src="https://www.youtube.com/embed/uUIi2lNE8xo?feature=oembed"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen=""
            />
          </Box>
        </Box>
      </IntroduceVideoBox>
    </Box>
  );
};

export default ProductIntroduceVideo;
