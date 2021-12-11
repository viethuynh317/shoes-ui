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
import { NavLink, useHistory } from 'react-router-dom';
import Controls from '../../../../components/controls/Controls';
import Notification from '../../../../components/Notification';
import PageHeader from '../../../../components/PageHeader';
import useTable from '../../../../hooks/customHooks/useTable';
import { clearStateStatus, getAllRoles } from '../../adminSlice';
import slugify from 'slugify';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
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

const headCells = [
  { id: '_id', label: 'Orders', disableSorting: true },
  { id: 'roleId', label: 'Role Id' },
  { id: 'roleName', label: 'Role' },
  { id: 'permission', label: 'Permission', disableSorting: true },
];

export default function RolesManagement() {
  const dispatch = useDispatch();
  const { roles, actionStatus } = useSelector((state) => state.admin);

  const history = useHistory();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    dispatch(clearStateStatus());
    dispatch(getAllRoles());
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

  const classes = useStyles();

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
            slugify(x.roleName)
              .toLowerCase()
              .includes(slugify(target.value).toLowerCase())
          );
      },
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(roles, headCells, filterFn);

  return (
    <>
      <PageHeader
        title="Roles"
        subTitle="Roles Permission"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Roles"
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
            {recordsAfterPagingAndSorting().map((item, ind) => (
              <TableRow key={item._id}>
                <TableCell>{ind + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {item.roleName.charAt(0).toUpperCase() +
                    item.roleName.slice(1)}
                </TableCell>

                <TableCell>
                  <NavLink to={`/admin/roles/${item.id}/permissions`}>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        history.push();
                      }}
                    >
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
