import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Checkbox from '../../../../../components/controls/Checkbox';
import Controls from '../../../../../components/controls/Controls';
import Notification from '../../../../../components/Notification';
import PageHeader from '../../../../../components/PageHeader';
import useTable from '../../../../../hooks/customHooks/useTable';
import {
  getEmployeeById,
  getPermissionsByUserId,
  setPermissionsByUserId,
  updatePermissionsByUserId,
} from '../../../adminSlice';
import { Search } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  centerTableCell: {
    '& div': {},
  },
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
  { id: 'permission', label: 'Permission', disableSorting: true },
  { id: 'editAction', label: 'Edit', disableSorting: true },
  { id: 'deleteAction', label: 'Delete', disableSorting: true },
  { id: 'createAction', label: 'Create', disableSorting: true },
  { id: 'viewAction', label: 'View', disableSorting: true },
];

export default function UserPermission() {
  const dispatch = useDispatch();
  const { employee, actionStatus, permissionsByUserId } = useSelector(
    (state) => state.admin
  );
  const { userId } = useParams();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(getEmployeeById(userId));
    dispatch(getPermissionsByUserId(userId));
  }, [dispatch, userId]);

  const { fullName, email } = employee;

  useEffect(() => {
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
    }
  }, [actionStatus]);

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
            x.namePermission.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  let tempPermissions = [];

  for (const permission1 of permissionsByUserId) {
    for (const actionPermission of permission1.actionPermissions) {
      if (actionPermission.license === 1)
        tempPermissions.push(actionPermission._id);
    }
  }

  const onChange = ({ name, value }) => {
    const newListPermissions = permissionsByUserId.map((permission) => {
      const newActionPermissions = permission.actionPermissions.map(
        (actionPermission) => {
          if (actionPermission._id === name)
            return { ...actionPermission, license: value };
          return actionPermission;
        }
      );
      return { ...permission, actionPermissions: newActionPermissions };
    });

    if (value === 0)
      tempPermissions = tempPermissions.filter((itemPer) => itemPer !== name);
    else tempPermissions.push(name);

    dispatch(setPermissionsByUserId(newListPermissions));
  };

  const handleSaveClick = (e) => {
    const data = { permissions: tempPermissions };
    dispatch(updatePermissionsByUserId({ id: userId, data }));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(permissionsByUserId, headCells, filterFn);

  return (
    <>
      <PageHeader
        title={fullName}
        subTitle={email}
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
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
          <Controls.Button
            text="Save & apply"
            variant="outlined"
            startIcon={<SaveIcon />}
            className={classes.newButton}
            onClick={handleSaveClick}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, indx) => (
              <TableRow key={indx}>
                <TableCell>{item.namePermission}</TableCell>
                {item.actionPermissions.map((action) => (
                  <TableCell
                    className={classes.centerTableCell}
                    align="justify"
                    key={action._id}
                  >
                    <Checkbox
                      name={action._id}
                      disabled={action.disabled || false}
                      value={action.license ? true : false}
                      onChange={onChange}
                    />
                  </TableCell>
                ))}
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
