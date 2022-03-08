import { Feedback, Search } from '@material-ui/icons';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTable from '../../../../hooks/customHooks/useTable';
import Controls from '../../../../components/controls/Controls';
import Notification from '../../../../components/Notification';
import PageHeader from '../../../../components/PageHeader';
import Popup from '../../../../components/Popup';

import { getAllFeedbacks, addReplyFeedback } from '../../employeeSlice';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@mui/material';
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
  { id: 'userName', label: 'User Name' },
  { id: 'content', label: 'Content' },
  { id: 'numOfStars', label: 'Stars' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function FeedbackManagement() {
  const dispatch = useDispatch();
  const { feedbacks, actionStatus } = useSelector((state) => state.employee);

  const [width] = useWindowSize();
  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    dispatch(getAllFeedbacks('607d8194e141e742289e2ece'));
    setIsCall(true);
  }, [dispatch]);

  const [infoForm, setInfoForm] = useState({
    titleForm: '',
    nameButton: '',
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(feedbacks, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter((x) =>
            x.userName.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const addNewReplyFeedback = (replyFeedback, resetForm) => {
    dispatch(
      addReplyFeedback({
        feedbackId: '6091ff398fe1960015a75a59',
        content: 'asdds',
      })
    );
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (feedbackId) => {
    setRecordForEdit(feedbackId);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        title="Feedback"
        subTitle="Feedback Management"
        icon={<Feedback fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Feedback"
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
                <TableCell>{item.userName}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.numOfStars}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    text="Reply"
                    color="primary"
                    onClick={() => {
                      setInfoForm({
                        titleForm: 'Add ReplyFeedback',
                        nameButton: 'Add',
                      });
                      setRecordForEdit(null);
                      openInPopup(item._id);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
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
        <FeedbackForm
          recordForEdit={recordForEdit}
          addNewReplyFeedback={addNewReplyFeedback}
          nameButton={infoForm.nameButton}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
