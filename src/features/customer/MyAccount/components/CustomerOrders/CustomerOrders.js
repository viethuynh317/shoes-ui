import { Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTable from '../../../../../hooks/customHooks/useTable';
import { getOrderByUserId } from '../../../customerSlice';
import MyAccount from '../../MyAccount';
import moment from 'moment';
import Controls from '../../../../../components/controls/Controls';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import ConfirmDialog from '../../../../../components/ConfirmDialog';
import { useHistory } from 'react-router-dom';
import { cancelOrder } from '../../../../Employee/employeeSlice';
import Notification from '../../../../../components/Notification';

const headCells = [
  { id: '_id', label: 'Orders', disableSorting: true },
  { id: 'orderId', label: 'Order Id', disableSorting: true },
  { id: 'createdAt', label: 'Created At', disableSorting: true },
  { id: 'updatedAt', label: 'Updated At', disableSorting: true },
  { id: 'total', label: 'Total', disableSorting: true },
  { id: 'status', label: 'Status', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const statusOrders = [
  { value: 0, name: 'Chờ xác nhận' },
  { value: 1, name: 'Chờ lấy hàng' },
  { value: 2, name: 'Đang giao hàng' },
  { value: 3, name: 'Đã giao hàng' },
  { value: 4, name: 'Thành công' },
];

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [hasCancel, setHasCancel] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await dispatch(getOrderByUserId());
      setOrders(res?.payload?.orders);
    };
    fetchOrders();
  }, [dispatch, hasCancel]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(orders, headCells, {
      fn: (items) => {
        return items;
      },
    });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (hasCancel) {
      setNotify({
        isOpen: true,
        message: 'Cancel Order Successfully!',
        type: 'success',
      });
    }
  }, [hasCancel]);

  const cancelOrderFn = async (id) => {
    await dispatch(cancelOrder(id));
    setConfirmDialog({
      isOpen: false,
      title: '',
      subTitle: '',
    });
    setHasCancel(true);
  };

  return (
    <MyAccount>
      {orders.length <= 0 ? (
        <>
          <Box>My Orders</Box>
          <Typography>Currently, There are no orders!</Typography>
        </>
      ) : (
        <>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, ind) => (
                <TableRow key={item._id}>
                  <TableCell>{ind + 1}</TableCell>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell>
                    {moment(item?.createdAt || '').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(item?.updatedAt || '').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {item?.total} <small>VND</small>
                  </TableCell>
                  <TableCell>
                    {
                      statusOrders.find(
                        (status) => status?.value === item?.statusId
                      )?.name
                    }
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton color="primary">
                      <CreateIcon
                        fontSize="small"
                        onClick={() => {
                          history.push(`/user/my-account/orders/${item?._id}`);
                        }}
                      />
                    </Controls.ActionButton>
                    {item?.statusId === 4 && (
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this record?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              cancelOrderFn(item?._id);
                            },
                          });
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
      )}
    </MyAccount>
  );
};

export default CustomerOrders;
