import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { styled } from "@mui/styles";
import React from "react";
import { orangeColor } from "../../../../../constants/globalConst";

const SubTypo = styled(Typography)(() => ({
  color: "#848484",
  fontSize: 14,
}));

const SendButton = styled(IconButton)(() => ({
  p: "10px",
  backgroundColor: orangeColor,
  color: "#fff",
  "&:hover": {
    backgroundColor: "#FFDD97",
    transition: "all 0.3s ease-in-out",
  },
}));

const NewsLetter = () => {
  return (
    <>
      <Box mb={3}>
        <Typography
          sx={{ fontWeight: 600, textTransform: "uppercase", fontSize: 29 }}
        >
          newsletter sign up
        </Typography>
        <SubTypo>
          Enjoy our newsletter to stay updated with the latest news and special
          sales.
        </SubTypo>
        <SubTypo>Let's your email address here!</SubTypo>
      </Box>
      <Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 14, color: "#848484" }}
            placeholder="Email"
          />
          <SendButton type="submit">
            <SendOutlinedIcon />
          </SendButton>
        </Paper>
      </Box>
    </>
  );
};

export default NewsLetter;
