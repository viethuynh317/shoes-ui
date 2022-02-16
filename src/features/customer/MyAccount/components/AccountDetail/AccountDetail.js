/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../../../../../components/Notification';
import {
  editCustomerProfile,
  getProfileCustomerById,
} from '../../../../Profile/profileSlice';
import MyAccount from '../../MyAccount';

const TextInput = styled(TextField)(() => ({
  width: '100%',
}));

const FieldSet = styled('fieldset')(() => ({
  borderWidth: 1,
  borderStyle: 'solid',
  padding: 20,
}));

const AccountDetail = () => {
  const inputEl = useRef(null);
  const [isEditUser, setStatusEditUser] = useState(false);
  const { customerUser, loading, actionStatus } = useSelector(
    (state) => state.profile
  );
  const [userEdit, setUserEdit] = useState(customerUser);
  const { userId } = JSON.parse(localStorage.getItem('customerProfile'));
  const [isCall, setIsCall] = useState(false);

  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    dispatch(getProfileCustomerById(userId));
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
    setUserEdit(customerUser);
    setStatusEditUser(true);
    inputEl.current.focus();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserEdit((userEdit) => ({ ...userEdit, [name]: value }));
  };

  const handleClickSaveChange = async () => {
    setStatusEditUser(false);
    const res = await dispatch(
      editCustomerProfile({ id: userId, data: userEdit })
    );
    setNotify({
      isOpen: true,
      message: res.payload.msg,
      type:
        res?.payload?.status === 200 ||
        res?.payload?.status === 201 ||
        res?.payload?.status === 202 ||
        res?.payload?.status === 203 ||
        res?.payload?.status === 204
          ? 'success'
          : 'error',
    });
  };
  return (
    <>
      <MyAccount>
        <FieldSet>
          <Typography
            variant="button"
            component="legend"
            textAlign="left"
            fontWeight={600}
            fontSize={17}
          >
            User Profile
          </Typography>
          <Box component="form">
            <Box>
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.fullName
                      : customerUser.fullName
                    : null
                }
                disabled={!isEditUser}
                fullWidth
                name="fullName"
                label="Full Name"
                onChange={onChange}
                margin="normal"
                ref={inputEl}
              />
            </Box>

            <Box className="content">
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.email
                      : customerUser.email
                    : null
                }
                disabled
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                onChange={onChange}
              />
            </Box>

            <Box>
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.phoneNumber
                      : customerUser.phoneNumber
                    : null
                }
                disabled={!isEditUser}
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                margin="normal"
                onChange={onChange}
              />
            </Box>

            <Box>
              <TextInput
                value={
                  !loading
                    ? isEditUser
                      ? userEdit.address
                      : customerUser.address
                    : null
                }
                disabled={!isEditUser}
                name="address"
                label="Address"
                fullWidth
                margin="normal"
                onChange={onChange}
              />
            </Box>

            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Birthday*"
                  value={
                    isEditUser ? userEdit?.birthday : customerUser?.birthday
                  }
                  onChange={
                    isEditUser
                      ? (date) => setUserEdit({ ...userEdit, birthday: date })
                      : null
                  }
                  disabled={!isEditUser}
                  renderInput={(params) => (
                    <TextInput margin="normal" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>

            {!isEditUser ? (
              <Box display="flex" justifyContent="flex-start" mt={2}>
                <Box mr={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickEditProfile}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="flex-start" mt={2}>
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
        </FieldSet>
      </MyAccount>
    </>
  );
};
export default AccountDetail;
