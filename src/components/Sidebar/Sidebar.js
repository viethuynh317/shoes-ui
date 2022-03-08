import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { makeStyles, styled } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/customHooks/useWindowsSize';
import { setOpen } from '../dashBoardSlice';

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const useStyles = makeStyles((theme) => ({
  linkChoice: {
    textDecoration: 'none',
    color: theme.palette.grey[800],
  },
}));

const Sidebar = (props) => {
  const { menu } = props;
  const classes = useStyles();
  const [width] = useWindowSize();

  useEffect(() => {
    if (width <= 800) dispatch(setOpen(false));
    if (width >= 1280) dispatch(setOpen(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const dispatch = useDispatch();
  const open = useSelector((state) => state?.dashboard?.open);

  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List datalist={menu}>
          {menu?.map(({ text, icon, link }, index) => (
            <Link to={link} key={index} className={classes.linkChoice}>
              <ListItem>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText>{text}</ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
