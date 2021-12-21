import { Search, ViewList, ViewModule } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
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
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeShoeFilter, fetchShoeList } from '../../../commons/shoesSlice';
import BannerPage from '../../../components/BannerPage/BannerPage';
import Footer from '../../../components/Customer/Footer/Footer';
import Nav from '../../../components/Customer/Header/Nav/Nav';
import Navbar from '../../../components/Customer/Header/Navbar/Navbar';
import ProductCard from '../../../components/Customer/ProductCard/ProductCard';
import ProductCardDetail from '../../../components/Customer/ProductCardDetail/ProductCardDetail';
import { debounce } from 'lodash';

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
  height: 120,
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

const MyAccount = ({ children }) => {
  const [view, setView] = useState('module');
  const [isClickFilter, setClickFilter] = useState(false);
  const [sort, setSort] = useState('sale');

  const [shoeList, setShoeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getShoeList = async () => {
      const data = await dispatch(
        fetchShoeList({
          page: page,
          perPage: view === 'module' ? 16 : 8,
        })
      );
      setShoeList(data?.payload?.data?.result || []);
      setTotal(data?.payload?.data?.total);
    };
    getShoeList();
  }, [dispatch, page, view]);

  const ref1 = useRef();
  const ref2 = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleChange = (event, nextView) => {
    setView(nextView);
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box mb={3}>
                  <TitleTypo variant="subtitle1" align="left">
                    By Brand
                  </TitleTypo>
                </Box>
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box mb={3}>
                  <TitleTypo variant="subtitle1" align="left">
                    By Color
                  </TitleTypo>
                </Box>
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
                  <Grid key={item.id} item xs={12} sm={6} md={3} lg={3} xl={2}>
                    <ProductCard key={item.id} {...item} />
                  </Grid>
                ))}
              </Grid>{' '}
            </>
          ) : (
            <Grid container spacing={2}>
              {shoeList.map((item) => (
                <>
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <ProductCardDetail key={item.id} {...item} />
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
    </>
  );
};

export default MyAccount;
