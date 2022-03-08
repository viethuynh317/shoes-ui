import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FeedbackForm from '../../features/Employee/components/FeedbackManagement/components/FeedbackForm/FeedbackForm';
import { addReplyFeedback } from '../../features/Employee/employeeSlice';
import ActionButton from '../controls/ActionButton';
import Notification from '../Notification';
import Popup from '../Popup';
// import { addReplyFeedback, clearActionStatus } from '../../../features/Employee/employeeSlice';
import './index.css';

export default function Feedback({ feedback }) {
  const { actionStatus } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const history = useHistory();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const roleId = +localStorage.getItem('roleId');

  const [infoForm, setInfoForm] = useState({
    titleForm: '',
    nameButton: '',
  });

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
    return () => {
      // dispatch(clearActionStatus());
    };
  }, [actionStatus, dispatch]);

  const openInPopup = (feedbackId) => {
    setRecordForEdit(feedbackId);
    setOpenPopup(true);
  };

  const addNewReplyFeedback = (replyFeedback, resetForm) => {
    dispatch(addReplyFeedback(replyFeedback));
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  return (
    <>
      <div className="feedback">
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          width="100%"
        >
          <Box display="flex">
            <img
              src="https://secure.gravatar.com/avatar/b26407fdbb151a3a44fceda692c92874?s=60&d=mm&r=g"
              height="60"
              width="60"
              alt="avatar"
            />
            <Box ml={2} sx={{ textAlign: 'left' }}>
              <Typography fontWeight={600} component="span">
                {feedback?.userName}
              </Typography>
              <Typography component="span" fontSize={14}>
                {' '}
                &nbsp; - &nbsp;{' '}
                {moment(feedback?.createdAt).format('HH:mm:ss, DD/MM/YYYY')}
              </Typography>
              <br />
              <Typography>{feedback?.content}</Typography>
            </Box>
          </Box>
          <Box>
            <ActionButton
              text="Reply"
              color="success"
              onClick={() => {
                setInfoForm({
                  titleForm: 'Add ReplyFeedback',
                  nameButton: 'Add',
                });
                setRecordForEdit(null);
                openInPopup(feedback._id);
              }}
            >
              <AddIcon fontSize="small" />
              Add Reply
            </ActionButton>
            <ActionButton
              text="Reply"
              color="primary"
              onClick={() => {
                if (roleId === 2)
                  history.push(`/employee/replies/${feedback._id}`);
                else history.push(`/admin/replies/${feedback._id}`);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
              List Reply
            </ActionButton>
          </Box>
        </Box>
      </div>
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
