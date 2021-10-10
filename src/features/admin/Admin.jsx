import { Box, Container, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MENU_ADMIN } from "../../constants/admin/adminConst";

const Admin = (props) => {
  const menuAdmin = MENU_ADMIN || [];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar menu={menuAdmin} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {props.children}
        </Container>
      </Box>
    </Box>
  );
};
Admin.propTypes = {};

export default Admin;
