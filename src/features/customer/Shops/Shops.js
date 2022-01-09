/* eslint-disable react-hooks/exhaustive-deps */
import { Search, ViewList, ViewModule } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearActionStatusCart } from '../../../commons/cartSlice';
import { fetchShoeList } from '../../../commons/shoesSlice';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import ProductCard from '../../../components/Customer/ProductCard/ProductCard';
import ProductCardDetail from '../../../components/Customer/ProductCardDetail/ProductCardDetail';
import Notification from '../../../components/Notification';
import { BRANDS, GENDERS } from '../../../constants/globalConst';
import { clearActionStatus } from '../customerSlice';

const HomePageMain = styled(Box)(({ theme }) => ({
  margin: '4rem 7.5rem 2rem',
}));

const BreadCrumbLink = styled(Link)(() => ({
  color: '#fff',
}));

const WrapperCollapseBox = styled(Box)(() => ({
  transition: 'height 0.3s ease-in-out',
  height: 0,
  overflow: 'hidden',
}));

const SubWrapperCollapseBox = styled(Box)(() => ({
  border: '1px solid #EBEBEB',
  padding: 32,
  minHeight: 120,
}));

const TitleTypo = styled(Typography)(() => ({
  fontWeight: 700,
  textTransform: 'uppercase',
}));

const sortList = [
  { name: 'Best Sale', value: 'sale' },
  { name: 'Best Rating', value: 'rating' },
  { name: 'Sort by price: low to high', value: 'inc' },
  { name: 'Sort by price: high to low', value: 'desc' },
];

const Shops = ({ children }) => {
  const dispatch = useDispatch();
  const { actionStatus } = useSelector((state) => state.customer);
  const { actionStatus: actionStatusCart } = useSelector((state) => state.cart);

  const [view, setView] = useState('module');
  const [isClickFilter, setClickFilter] = useState(false);

  const [sort, setSort] = useState('sale');
  const [shoeList, setShoeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [rangePrice, setRangePrice] = React.useState([0, 5000]);

  const [brand, setBrand] = useState(null);
  const [gender, setGender] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const handlePriceChange = (event, newValue) => {
    setRangePrice(newValue);
  };

  useEffect(() => {
    const getShoeList = async () => {
      const data = await dispatch(
        fetchShoeList({
          page,
          perPage: view === 'module' ? 16 : 8,
          brand,
          gender,
          search: searchQuery,
          orderBy: sort,
          rangePrice,
        })
      );
      setShoeList(data?.payload?.data?.result || []);
      setTotal(data?.payload?.data?.total);
    };
    getShoeList();
  }, [
    dispatch,
    page,
    view,
    brand,
    gender,
    searchQuery,
    sort,
    rangePrice,
    actionStatus,
  ]);

  useEffect(() => {
    dispatch(clearActionStatusCart());
    if (actionStatus) {
      setNotify({
        isOpen: true,
        message: actionStatus.msg,
        type:
          actionStatus.status === 200 ||
          actionStatus.status === 201 ||
          actionStatus.status === 202 ||
          actionStatus.status === 203 ||
          actionStatus.status === 204
            ? 'success'
            : 'error',
      });
      dispatch(clearActionStatus());
    }
  }, [actionStatus]);

  useEffect(() => {
    dispatch(clearActionStatus());
    if (actionStatusCart) {
      setNotify({
        isOpen: true,
        message: actionStatusCart.msg,
        type:
          actionStatusCart.status === 200 ||
          actionStatusCart.status === 201 ||
          actionStatusCart.status === 202 ||
          actionStatusCart.status === 203 ||
          actionStatusCart.status === 204
            ? 'success'
            : 'error',
      });
      dispatch(clearActionStatusCart());
    }
  }, [actionStatusCart]);

  const ref1 = useRef();
  const ref2 = useRef();

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debounceSearchInput = useCallback(
  //   debounce((value) => setSearchQuery(value), 500),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  const handleShoeSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    setPage(0);
  };

  const handleChange = (event, nextView) => {
    setView(nextView);
    setPage(0);
  };

  const handleFilterClick = () => {
    setClickFilter((prevState) => !prevState);
    var growDiv = ref1.current;
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      var wrapper = ref2.current;
      growDiv.style.height = wrapper.clientHeight + 'px';
    }
  };

  const handlePaginationChange = (e, nextPage) => {
    setPage(nextPage);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(0);
  };

  const handleBrandChange = (e, nextValue) => {
    setBrand(nextValue);
    setPage(0);
  };

  const handleGenderChange = (e, nextValue) => {
    setGender(nextValue);
    setPage(0);
  };

  const breadcrumbs = [
    <BreadCrumbLink underline="hover" key="1" href="/user/homepage">
      Homepage
    </BreadCrumbLink>,
    <Typography key="2" sx={{ color: '#fff' }}>
      Shops
    </Typography>,
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Navbar />
        <Nav />
      </Box>
      <BannerPage breadcrumbs={breadcrumbs} title="shops" />
      <HomePageMain>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleChange}
              size="small"
            >
              <ToggleButton value="module" aria-label="module">
                <Tooltip title="Grid view">
                  <ViewModule />
                </Tooltip>
              </ToggleButton>

              <ToggleButton value="list" aria-label="list">
                <Tooltip title="List view">
                  <ViewList />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <Box ml={2} width={250}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort by</InputLabel>
                <Select
                  label="Sort by"
                  name="sortBy"
                  value={sort}
                  onChange={handleSortChange}
                >
                  {sortList.map((option, index) => (
                    <MenuItem value={option.value} key={index}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Button
              onClick={handleFilterClick}
              endIcon={!isClickFilter ? <MenuIcon /> : <CloseIcon />}
            >
              Filter
            </Button>
          </Box>
        </Box>
        <WrapperCollapseBox ref={ref1} my={3}>
          <SubWrapperCollapseBox ref={ref2}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Box mb={3}>
                  <TitleTypo variant="subtitle1" align="left">
                    Search
                  </TitleTypo>
                </Box>
                <TextField
                  label="Search Shoe"
                  name="search"
                  value={searchQuery}
                  onChange={handleShoeSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box mb={3}>
                  <TitleTypo variant="subtitle1" align="left">
                    By Price
                  </TitleTypo>
                </Box>
                <Box>
                  <Slider
                    value={rangePrice}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    max={10000}
                    step={200}
                  />
                </Box>
                <Box mb={1}>
                  <Typography variant="subtitle1" color="#848484">
                    Price: &nbsp;
                    <span>{rangePrice.join(' - ')} VND</span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box mb={3}>
                  <TitleTypo variant="subtitle1" align="left">
                    By Brand
                  </TitleTypo>
                </Box>
                <Autocomplete
                  value={brand}
                  onChange={handleBrandChange}
                  id="controllable-states-demo"
                  options={BRANDS}
                  renderInput={(params) => (
                    <TextField {...params} label="Brands" />
                  )}
                  size="small"
                  fullWidth
                  getOptionLabel={(option) => option.toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box mb={3}>
                  <TitleTypo variant="subtitle1" align="left">
                    By Gender
                  </TitleTypo>
                </Box>
                <Autocomplete
                  value={gender}
                  onChange={handleGenderChange}
                  id="controllable-states-demo"
                  options={GENDERS}
                  renderInput={(params) => (
                    <TextField {...params} label="Genders" />
                  )}
                  size="small"
                  fullWidth
                  getOptionLabel={(option) => option.toUpperCase()}
                />
              </Grid>
            </Grid>
          </SubWrapperCollapseBox>
        </WrapperCollapseBox>
        <Divider />
        <Box mt={4} mb={8}>
          {view === 'module' ? (
            <>
              <Grid container spacing={2}>
                {shoeList.map((item) => (
                  <Grid key={item._id} item xs={12} sm={6} md={3} lg={3} xl={2}>
                    <ProductCard key={item._id} {...item} />
                  </Grid>
                ))}
              </Grid>{' '}
            </>
          ) : (
            <Grid container spacing={2}>
              {shoeList.map((item) => (
                <>
                  <Grid
                    key={item._id}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <ProductCardDetail key={item._id} {...item} />
                  </Grid>
                </>
              ))}
            </Grid>
          )}
        </Box>
        <Box display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(view === 'module' ? total / 16 : total / 8)}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </Box>
      </HomePageMain>
      <Box mt={8}>
        <Footer />
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Shops;
