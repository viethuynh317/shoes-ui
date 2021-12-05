import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FeedbackForm from '../../features/Employee/components/FeedbackManagement/components/FeedbackForm/FeedbackForm';
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
    // dispatch(addReplyFeedback(replyFeedback));
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  return (
    <>
      <div className="feedback">
        <div className="header-feedback">
          <div className="header-feedback-left">
            <img
              className="feedback-user-avatar"
              src="https://i.pinimg.com/236x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg"
              alt="img"
            ></img>
          </div>
          <div className="header-feedback-right">
            <div>
              <span className="feedback-user-name">{feedback.userName}</span>
              <span className="feedback-num-star">
                {Math.round(feedback.numOfStars * 10) / 10} sao
              </span>
            </div>
            <span className="feedback-date">{new Date(feedback.createAt).toLocaleString()}</span>
            <div className="body-feedback">
              <p className="content-feedback">{feedback.content}</p>
              <div className="list-reply">{}</div>
            </div>
          </div>
        </div>
        <div>
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
              if (roleId === 2) history.push(`/employee/replys/${feedback._id}`);
              else history.push(`/admin/replys/${feedback._id}`);
            }}
          >
            <EditOutlinedIcon fontSize="small" />
            List Reply
          </ActionButton>
        </div>
      </div>
      <Popup title={infoForm.titleForm} openPopup={openPopup} setOpenPopup={setOpenPopup}>
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
