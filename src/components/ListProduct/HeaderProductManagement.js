/* eslint-disable react-hooks/exhaustive-deps */
import { AddCircleOutline, Search, StoreOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeShoeFilter } from '../../commons/shoesSlice';
import Controls from '../../components/controls/Controls';
import useWindowSize from '../../hooks/customHooks/useWindowsSize';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
  pageHeader: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: '20px 20px',
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1',
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
  toolbar: {
    bottom: '0px',
    right: '0px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchInput: {
    '& .MuiOutlinedInput-input': {
      padding: '11.5px 5px',
      fontSize: '0.95rem',
    },
  },
  buttonAddProduct: {
    backgroundColor: '#1d4eda',
    border: 'none',
    outline: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '11.5px 14px',
    marginRight: '15px',
    cursor: 'pointer',
  },
  plus: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '3px',
  },
  filterStatus: {
    padding: '10px',
    margin: '0 5px',
    outline: 'none',
    borderRadius: '4px',
  },
  filterPrice: {
    padding: '10px',
    outline: 'none',
    borderRadius: '4px',
  },
}));

export default function PageHeader() {
  const history = useHistory();
  const [width] = useWindowSize();
  const hasAdmin = history.location.pathname.split('/')[1] === 'admin';
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.shoes.filter);
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  const debounceSearchInput = useCallback(
    debounce((value) => dispatch(changeShoeFilter(value)), 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleShoeSearchChange = (e) => {
    const { name, value } = e.target;
    const filterData = { [name]: value };
    setSearchQuery(value);
    debounceSearchInput(filterData);
  };

  const handleShoeFilterChange = (e) => {
    const { name, value } = e.target;
    const filterData = { [name]: value };

    dispatch(changeShoeFilter(filterData));
  };
  const handleClickAddButton = () => {
    history.push(hasAdmin ? `/admin/shoes/add` : `/employee/shoes/add`);
  };
  return (
    <Paper
      elevation={0}
      square
      className={classes.root}
      {...(width <= 500 ? { sx: { flexDirection: 'column' } } : {})}
    >
      <Box>
        <div className={classes.pageHeader}>
          <Card className={classes.pageIcon}>
            <StoreOutlined fontSize="large" />
          </Card>
          <div className={classes.pageTitle}>
            <Typography variant="h6" component="div">
              Shoes
            </Typography>
            <Typography variant="subtitle2" component="div">
              Shoes Management
            </Typography>
          </div>
        </div>
      </Box>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              startIcon={<AddCircleOutline />}
              onClick={handleClickAddButton}
              variant="outlined"
            >
              Add Shoe
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Controls.Input
              label="Search Shoe"
              name="search"
              value={searchQuery}
              size="small"
              onChange={handleShoeSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <Search />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Select
              name="isConfirmed"
              value={filter?.isConfirmed}
              onChange={handleShoeFilterChange}
              size="small"
              defaultValue={0}
              fullWidth
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              <MenuItem value={true}>Đã phê duyệt</MenuItem>
              <MenuItem value={false}>Chưa phê duyệt</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Select
              name="unitPrice"
              value={filter?.unitPrice}
              onChange={handleShoeFilterChange}
              size="small"
              defaultValue={0}
              fullWidth
            >
              <MenuItem value={0}>Mặc định</MenuItem>
              <MenuItem value={1}>Tăng dần</MenuItem>
              <MenuItem value={-1}>Giảm dần</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
}
