import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@mui/material';
import { TwoWheeler, Search } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import Controls from '../../../../components/controls/Controls';
import Notification from '../../../../components/Notification';
import PageHeader from '../../../../components/PageHeader';
import Popup from '../../../../components/Popup';
import useTable from '../../../../hooks/customHooks/useTable';
import {
  createNewShipper,
  deleteShipper,
  getAllShippers,
  updateInfoShipper,
} from '../../employeeSlice';
import ShipperForm from './components/ShipperForm/ShipperForm';
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
  { id: '_id', label: 'Orders' },
  { id: 'fullName', label: 'Shipper Name' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'address', label: 'Address' },
  { id: 'status', label: 'Status' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function ShipperManagement() {
  const dispatch = useDispatch();
  const { shippers, actionStatus } = useSelector((state) => state.employee);
  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    dispatch(getAllShippers());
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

  const classes = useStyles();
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
    useTable(shippers, headCells, filterFn);

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

  const addOrEdit = (shipper, resetForm) => {
    if (infoForm.nameButton === 'Add') {
      dispatch(createNewShipper(shipper));
    } else if (infoForm.nameButton === 'Update') {
      dispatch(
        updateInfoShipper({
          id: shipper._id,
          data: { ...shipper, isIdle: Number(shipper.isIdle) },
        })
      );
    }
    resetForm();
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
    dispatch(deleteShipper(id));
  };

  return (
    <>
      <PageHeader
        title="Shippers"
        subTitle="Shippers Management"
        icon={<TwoWheeler fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Shippers"
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
                titleForm: 'Add Shipper',
                nameButton: 'Add',
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
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.birthday.slice(0, 10)}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      setInfoForm({
                        titleForm: 'Update Employee',
                        nameButton: 'Update',
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
                        title: 'Are you sure to delete this shipper?',
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
        <ShipperForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          nameButton={infoForm.nameButton}
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
