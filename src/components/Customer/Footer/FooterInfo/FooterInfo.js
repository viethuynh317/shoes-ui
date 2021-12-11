import { Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import React, { cloneElement } from "react";

const IconBox = styled(Box)(() => ({
  padding: 8,
  border: "1px solid #999999",
}));

const StyleWrapperBox = styled(Box)(({ customColor }) => ({
  "&:hover span p": {
    color: customColor,
    transition: "all 0.3s ease-in-out",
  },
  "&:hover span.style-box": {
    backgroundColor: customColor,
    transition: "all 0.3s ease-in-out",
  },
}));

const FooterInfo = ({ icon, title, color }) => {
  return (
    <StyleWrapperBox display="flex" alignItems="center" customColor={color}>
      <IconBox component="span" className="style-box">
        {cloneElement(icon, {
          style: {
            color: "#999999",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
          },
        })}
      </IconBox>
      <Box component="span" ml={2}>
        <Typography sx={{ color: "#fff", fontSize: 14 }}>{title}</Typography>
      </Box>
    </StyleWrapperBox>
  );
};

export default FooterInfo;
