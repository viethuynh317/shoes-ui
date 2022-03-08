/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById } from '../profileSlice';
import { useHistory } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { editProfile } from '../profileSlice';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import Notification from '../../../components/Notification';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import useWindowSize from '../../../hooks/customHooks/useWindowsSize';

const TextInput = styled(TextField)(({ widthSize }) => ({
  width:
    widthSize > 992
      ? '50%'
      : widthSize <= 992 && widthSize > 768
      ? '70%'
      : '100%',
}));

const Profile = () => {
  const inputEl = useRef(null);
  const history = useHistory();
  const [isEditUser, setStatusEditUser] = useState(false);
  const { user, loading, actionStatus } = useSelector((state) => state.profile);
  const [userEdit, setUserEdit] = useState(user);
  const roleId = Number(localStorage.getItem('roleId'));
  const { userId } = JSON.parse(localStorage.getItem('dashboardProfile'));
  const [isCall, setIsCall] = useState(false);

  const dispatch = useDispatch();

  const [width] = useWindowSize();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  useEffect(() => {
    dispatch(getProfileById(userId));
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

  const handleClickEditProfile = () => {
    setUserEdit(user);
    setStatusEditUser(true);
    inputEl.current.focus();
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setUserEdit((userEdit) => ({ ...userEdit, [name]: value }));
  };
  const handleClickChangePassword = () => {
    if (+localStorage.getItem('roleId') === 0) {
      history.push('/admin/change-password');
    } else if (+localStorage.getItem('roleId') === 2) {
      history.push('/employee/change-password');
    } else {
      history.push('/auth/login');
    }
  };
  const handleClickSaveChange = async () => {
    setStatusEditUser(false);
    const res = await dispatch(editProfile({ id: userId, data: userEdit }));
    setNotify({
      isOpen: true,
      message: res.payload.msg,
      type: res.type === 'profile/editProfile/fulfilled' ? 'success' : 'error',
    });
  };
  return (
    <div>
      {loading ? (
        <div className="loading-content">
          <CircularProgress />
        </div>
      ) : (
        <React.Fragment>
          <Typography variant="h5">User Profile</Typography>
          <Box>
            <Box component="form">
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.fullName
                      : user.fullName
                    : null
                }
                disabled={!isEditUser}
                fullWidth
                name="fullName"
                label="Full Name"
                onChange={onChange}
                margin="normal"
                ref={inputEl}
                widthSize={width}
              />
            </Box>

            <Box className="content">
              <TextInput
                value={
                  !loading ? (isEditUser ? userEdit.email : user.email) : null
                }
                disabled
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                onChange={onChange}
                widthSize={width}
              />
            </Box>

            <Box>
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.phoneNumber
                      : user.phoneNumber
                    : null
                }
                disabled={!isEditUser}
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                margin="normal"
                onChange={onChange}
                widthSize={width}
              />
            </Box>

            <Box>
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.address
                      : user.address
                    : null
                }
                disabled={!isEditUser}
                name="address"
                label="Address"
                fullWidth
                margin="normal"
                onChange={onChange}
                widthSize={width}
              />
            </Box>

            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Birthday*"
                  value={isEditUser ? userEdit?.birthday : user?.birthday}
                  onChange={
                    isEditUser
                      ? (date) => setUserEdit({ ...userEdit, birthday: date })
                      : null
                  }
                  disabled={!isEditUser}
                  renderInput={(params) => (
                    <TextInput
                      margin="normal"
                      fullWidth
                      {...params}
                      widthSize={width}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box>
              <TextInput
                value={!loading ? (roleId === 0 ? 'ADMIN' : 'EMPLOYEE') : null}
                disabled={true}
                label="Role"
                fullWidth
                margin="normal"
                widthSize={width}
              />
            </Box>

            {!isEditUser ? (
              <Box
                display="flex"
                justifyContent="center"
                mt={2}
                flexWrap="wrap"
              >
                <Box mr={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    className="button-edit-profile"
                    onClick={handleClickEditProfile}
                  >
                    Edit Profile
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClickChangePassword}
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickSaveChange}
                >
                  Save Change
                </Button>
              </Box>
            )}
          </Box>
          <Notification notify={notify} setNotify={setNotify} />
        </React.Fragment>
      )}
    </div>
  );
};
export default Profile;
