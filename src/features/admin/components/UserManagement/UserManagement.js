import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Controls from '../../../../components/controls/Controls';
import Notification from '../../../../components/Notification';
import PageHeader from '../../../../components/PageHeader';
import useTable from '../../../../hooks/customHooks/useTable';
import { getAllUsers } from '../../adminSlice';
import slugify from 'slugify';
import { makeStyles } from '@mui/styles';
import useWindowSize from '../../../../hooks/customHooks/useWindowsSize';

const useStyles = makeStyles((theme) => ({
  pageContent: ({ width }) => ({
    margin: width > 992 ? theme.spacing(5) : theme.spacing(1),
    padding: width > 992 ? theme.spacing(3) : theme.spacing(1),
  }),
  searchInput: {
    width: '75%',
    '& .MuiOutlinedInput-input': {
      padding: '11.5px 14px',
      fontSize: '0.95rem',
    },
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
  '.MuiOutlinedInput-input': {
    padding: '11.5px 14px',
  },
}));

const roles = [
  { value: 0, name: 'Admin' },
  { value: 1, name: 'Customer' },
  { value: 2, name: 'Employee' },
];

const headCells = [
  { id: '_id', label: 'Orders' },
  { id: 'fullName', label: 'User Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'address', label: 'Address' },
  { id: 'role', label: 'Role' },
  { id: 'actions', label: 'Permission', disableSorting: true },
];

export default function UserManagement() {
  const dispatch = useDispatch();
  const { users, actionStatus } = useSelector((state) => state.admin);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [width] = useWindowSize();
  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    setIsCall(true);
  }, [dispatch]);

  useEffect(() => {
    if (isCall && actionStatus) {
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
    }
  }, [actionStatus, isCall]);

  const classes = useStyles({ width });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter((x) =>
            slugify(x.fullName)
              .toLowerCase()
              .includes(slugify(target.value).toLowerCase())
          );
      },
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(users, headCells, filterFn);

  return (
    <>
      <PageHeader
        title="Users"
        subTitle="Users Permission"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Users"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting()
              .filter((record) => record.roleId !== 0)
              .map((item, ind) => (
                <TableRow key={item._id}>
                  <TableCell>{ind + 1}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    {roles.find((role) => role.value === item.roleId).name}
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/admin/users/${item._id}/permissions`}>
                      <Controls.ActionButton color="primary">
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
