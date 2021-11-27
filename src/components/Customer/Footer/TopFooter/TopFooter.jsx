import {
  Box,
  Divider,
  Grid,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import FooterInfo from "../FooterInfo/FooterInfo";
import { styled } from "@mui/styles";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const socialInfo = [
  {
    id: "1",
    icon: <FaFacebookF />,
    title: "Facebook",
    color: "#3b5998",
  },
  {
    id: "2",
    icon: <FaInstagram />,
    title: "Instagram",
    color: "#d6249f",
  },
  {
    id: "3",
    icon: <FaYoutube />,
    title: "Youtube ",
    color: "#c4302b",
  },
  {
    id: "4",
    icon: <FaTwitter />,
    title: "Twitter",
    color: "#1DA1F2",
  },
];

const footerInfo = [
  {
    id: "1",
    icon: <LocationOnOutlinedIcon />,
    title: "01 Nguyen Luong Bang, Da Nang",
  },
  {
    id: "2",
    icon: <LocalPhoneOutlinedIcon />,
    title: "033 8948317",
  },
  {
    id: "3",
    icon: <EmailOutlinedIcon />,
    title: "huynhvanviet317@gmail.com",
  },
  {
    id: "4",
    icon: <PublicOutlinedIcon />,
    title: "https://www.facebook.com/profile.php?id=100014881625813",
  },
];

const FooterWrapperBox = styled(Box)(() => ({
  backgroundColor: "#202020",
}));

const TitleTypo = styled(Typography)(() => ({
  color: "#fff",
  fontWeight: 700,
  textTransform: "uppercase",
}));

const LinkCustom = styled(Link)(() => ({
  color: "#999999",
  textDecoration: "none",
  fontSize: 14,
  cursor: "pointer",
  "&:hover, &:focus": {
    color: "#fff",
    transition: "all 0.3s ease-in-out",
  },
}));

const TopFooter = () => {
  return (
    <FooterWrapperBox px={8}>
      <Box pb={6} pt={6}>
        <Grid container>
          {footerInfo.map((item) => (
            <Grid item key={item.id} spacing={5} xs={12} sm={6} md={3}>
              <FooterInfo {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ borderColor: "#999999" }} />
      <Box py={6}>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <TitleTypo variant="subtitle1" align="left">
              Customer Service
            </TitleTypo>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 0,
              }}
            >
              <ListItemText>
                <LinkCustom>Search Term</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Advanced Search</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Help & FAQs</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Consultant</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Store Locations</LinkCustom>
              </ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TitleTypo variant="subtitle1" align="left">
              Categories
            </TitleTypo>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 0,
              }}
            >
              <ListItemText>
                <LinkCustom>All Brands</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Shoes Men</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Shoes Women</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Shoes Nike</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Shoes Jordan</LinkCustom>
              </ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TitleTypo variant="subtitle1" align="left">
              Information
            </TitleTypo>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 0,
              }}
            >
              <ListItemText>
                <LinkCustom>Contact Us</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Privacy Policy</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Terms & Conditions</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Customer Service</LinkCustom>
              </ListItemText>
              <ListItemText>
                <LinkCustom>Delivery Information</LinkCustom>
              </ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TitleTypo variant="subtitle1" align="left">
              Follow Us
            </TitleTypo>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 0,
              }}
            >
              {socialInfo.map((item) => (
                <ListItemText item={item.id}>
                  <LinkCustom>
                    <FooterInfo {...item} />
                  </LinkCustom>
                </ListItemText>
              ))}
            </ListItem>
          </Grid>
        </Grid>
      </Box>
    </FooterWrapperBox>
  );
};

export default TopFooter;
