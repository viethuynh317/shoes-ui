import { Box, Container, Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { MENU_EMPLOYEE } from '../../constants/employee/employeeConst';

const Employee = (props) => {
  const menuEmployee = MENU_EMPLOYEE || [];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar menu={menuEmployee} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
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
Employee.propTypes = {};

export default Employee;
