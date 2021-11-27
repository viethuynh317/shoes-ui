import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import { orangeColor } from "../../../constants/globalConst";
import Nav from "./Nav/Nav";
import Navbar from "./Navbar/Navbar";

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 9999,
  width: "100%",
}));

const Header = () => {
  return (
    <HeaderWrapper
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Navbar />
      <Nav />
    </HeaderWrapper>
  );
};

export default Header;
