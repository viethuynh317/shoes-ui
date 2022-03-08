import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import Controls from '../../../../components/controls/Controls';
import Notification from '../../../../components/Notification';
import PageHeader from '../../../../components/PageHeader';
import Popup from '../../../../components/Popup';
import useTable from '../../../../hooks/customHooks/useTable';
import {
  deleteEmployee,
  getEmployees,
  insertEmployee,
  updateEmployee,
} from '../../adminSlice';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
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

const headCells = [
  { id: '_id', label: 'Orders' },
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'address', label: 'Address' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function EmployeeManagement() {
  const dispatch = useDispatch();
  const { employees, actionStatus } = useSelector((state) => state.admin);

  const [width] = useWindowSize();
  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    dispatch(getEmployees());
    setIsCall(true);
  }, [dispatch]);

  const [infoForm, setInfoForm] = useState({
    titleForm: '',
    nameButton: '',
    isShowPasswordField: false,
    isDisableEmail: false,
  });

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
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(employees, headCells, filterFn);

  const addEmployee = (data) => {
    return data;
  };

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

  const addOrEdit = (employee, resetForm) => {
    if (infoForm.nameButton === 'Add') {
      dispatch(insertEmployee(addEmployee(employee)));
    } else {
      dispatch(updateEmployee({ id: employee._id, data: employee }));
    }
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteEmployee(id));
  };

  return (
    <>
      <PageHeader
        title="Employees"
        subTitle="Employees Management"
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
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setInfoForm({
                titleForm: 'Add Employee',
                nameButton: 'Add',
                isShowPasswordField: true,
                isDisableEmail: false,
              });
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, ind) => (
              <TableRow key={item._id}>
                <TableCell>{ind + 1}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      setInfoForm({
                        titleForm: 'Update Employee',
                        nameButton: 'Update',
                        isShowPasswordField: false,
                        isDisableEmail: true,
                      });
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item._id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title={infoForm.titleForm}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          nameButton={infoForm.nameButton}
          isShowPasswordField={infoForm.isShowPasswordField}
          isDisableEmail={infoForm.isDisableEmail}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
