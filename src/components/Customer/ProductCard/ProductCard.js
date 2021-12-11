/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { orangeColor } from "../../../constants/globalConst";

const CardImage = styled(Box)(() => ({
  overflow: "hidden",
  filter: "brightness(100%)",
  transition: "all 0.4s ease",
  "& > img": {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    transition: "all 0.4s ease",
    backgroundPosition: "center",
    backgroundSize: "cover",
    transform: "scale(0.75)",
    borderRadius: 8,
  },
  "&:hover > img": {
    transform: "scale(0.9)",
    backgroundSize: "cover",
    backgroundColor: "rgba(0,0,0,0.35)",
    backgroundPosition: "center",
  },
  "&:hover": {
    filter: "brightness(80%)",
  },
}));

const CustomIconBtn = styled(IconButton)(() => ({
  "&:hover": {
    transition: "all 0.3s ease-in-out",
    backgroundColor: orangeColor,
    color: "#fff",
  },
}));

const NameTypo = styled(Typography)(() => ({
  cursor: "pointer",
  "&:hover": {
    color: orangeColor,
    transition: "all 0.3s ease-in-out",
  },
}));

const ProductCard = ({
  name,
  imageUrl,
  unitPrice,
  discountOff,
  description,
  numOfStars,
  className,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }} className={className || ""}>
      <CardImage height={350}>
        <img src={imageUrl} />
      </CardImage>
      <CardContent sx={{ height: 100 }}>
        <NameTypo gutterBottom variant="body1" component="div">
          {name}
        </NameTypo>
        <Typography variant="body2" gutterBottom>
          <Rating name="read-only" value={numOfStars} readOnly size="small" />
        </Typography>
        <Typography
          component="div"
          variant="body1"
          fontWeight={700}
          fontSize={19}
        >
          {unitPrice.toLocaleString("vi-VN")}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <CustomIconBtn>
          <ShoppingCartOutlinedIcon />
        </CustomIconBtn>
        <CustomIconBtn>
          <SearchOutlinedIcon />
        </CustomIconBtn>
        <CustomIconBtn>
          <LoopOutlinedIcon />
        </CustomIconBtn>
        <CustomIconBtn>
          <FavoriteBorderOutlinedIcon />
        </CustomIconBtn>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
