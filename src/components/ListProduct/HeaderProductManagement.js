/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Search } from '@mui/icons-material';
import Controls from '../../components/controls/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Card,
  InputAdornment,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { changeShoeFilter } from '../../commons/shoesSlice';
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff',
    position: 'relative',
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
    position: 'absolute',
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
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.shoes.filter);
  const roleId = localStorage.getItem('roleId');
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
    history.push(`/admin/shoes/add`);
  };
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          <FastfoodIcon fontSize="large" />
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            Products
          </Typography>
          <Typography variant="subtitle2" component="div">
            Products Management
          </Typography>
        </div>
      </div>
      <Toolbar className={classes.toolbar}>
        {/* {+roleId === 2 ? (
          <button className={classes.buttonAddProduct} onClick={handleClickAddButton}>
            <span className={classes.plus}>+</span> Add Product
          </button>
        ) : null} */}
        <button
          className={classes.buttonAddProduct}
          onClick={handleClickAddButton}
        >
          <span className={classes.plus}>+</span> Add Product
        </button>
        <Controls.Input
          label="Search Product"
          name="search"
          className={classes.searchInput}
          value={searchQuery}
          onChange={handleShoeSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <select
          name="isConfirmed"
          value={filter?.isConfirmed}
          onChange={handleShoeFilterChange}
          className={classes.filterStatus}
        >
          <option value={0}>Tất cả</option>
          <option value={true}>Đã phê duyệt</option>
          <option value={false}>Chưa phê duyệt</option>
        </select>
        <select
          name="unitPrice"
          value={filter?.unitPrice}
          onChange={handleShoeFilterChange}
          className={classes.filterPrice}
        >
          <option value={0}>Mặc định</option>
          <option value={1}>Tăng dần</option>
          <option value={-1}>Giảm dần</option>
        </select>
      </Toolbar>
    </Paper>
  );
}
