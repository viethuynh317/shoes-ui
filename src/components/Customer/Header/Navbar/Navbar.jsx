import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { orangeColor } from "../../../../constants/globalConst";

const CartBox = styled(Box)(({ theme }) => ({
  backgroundColor: orangeColor,
  color: "#fff",
  cursor: "pointer",
  fontSize: 14,
  "&:hover": {
    backgroundColor: `${orangeColor}cc`,
    transition: "all 0.3s ease-in-out",
  },
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  color: "#fff",
  mr: 1,
  textTransform: "none",
  "&:hover": {
    color: orangeColor,
    transition: "all 0.3s ease-in-out",
  },
}));

const MenuTypo = styled(Typography)(({ theme }) => ({
  fontSize: 15,
}));

const Navbar = () => {
  return (
    <Box
      display="flex"
      mx={20}
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <Box display="flex" alignItems="center">
        <LocalPhoneIcon color="action" sx={{ fontSize: 16, color: "#fff" }} />
        <Typography
          variant="subtitle2"
          ml={1}
          sx={{ letterSpacing: 2, color: "#fff" }}
        >
          033 8948317
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <ButtonCustom variant="text">
          <Box display="flex" alignItems="center">
            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
            <MenuTypo ml={0.5}>Wishlist (0)</MenuTypo>
          </Box>
        </ButtonCustom>
        <ButtonCustom variant="text">
          <Box display="flex" alignItems="center">
            <PeopleOutlineIcon sx={{ fontSize: 16 }} />
            <MenuTypo ml={0.5}>Login</MenuTypo>
          </Box>
        </ButtonCustom>
        <CartBox display="flex" alignItems="center" py={1.5} px={2} ml={2}>
          <ShoppingCartOutlinedIcon />
          <Typography ml={1}>
            2 items -{" "}
            <Typography component="span" fontWeight={700}>
              1.000.000 <small>VND</small>
            </Typography>
          </Typography>
        </CartBox>
      </Box>
    </Box>
  );
};

export default Navbar;
