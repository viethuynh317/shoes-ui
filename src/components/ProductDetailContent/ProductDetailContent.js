import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  addNewShoe,
  deleteShoeById,
  updateShoeById,
} from '../../commons/shoesSlice';
import ConfirmDialog from '../../components/ConfirmDialog';
import './index.css';

const ProductDetailContent = ({ productDetail, action }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const hasAdmin = history.location.pathname.split('/')[1] === 'admin';
  const handleClickEditProduct = () => {
    // history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/products/${productDetail._id}/edit`);
    history.push(
      `/${hasAdmin ? 'admin' : 'employee'}/shoes/${productDetail?._id}/edit`
    );
  };
  const saveProductClick = () => {
    const { typeId, imageUrl, discountOff, discountMaximum } = productDetail;
    console.log(imageUrl);
    const shoe = {
      ...productDetail,
      imageUrl: imageUrl,
      typeId: typeId,
      discountOff: discountOff ? parseInt(discountOff) : 0,
      discountMaximum: discountMaximum ? parseInt(discountMaximum) : 0,
    };
    if (action === 'edit') {
      dispatch(updateShoeById({ id: shoe?._id, data: shoe }));
    } else {
      dispatch(addNewShoe(shoe));
    }
    console.log(shoe);
    // history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/products`);
    history.push(`/${hasAdmin ? 'admin' : 'employee'}/shoes`);
  };
  const handleClickDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this product?',
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        onDelete(productDetail?._id);
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteShoeById(id));
    // history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/products`);
    history.push(`/${hasAdmin ? 'admin' : 'employee'}/shoes`);
  };
  const fnConfirmProduct = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(updateShoeById({ id, data: { isConfirmed: true } }));
    // history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/products`);
    history.push(`/${hasAdmin ? 'admin' : 'employee'}/shoes`);
  };
  const handleVerifyProduct = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to confirm this product?',
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        fnConfirmProduct(productDetail?._id);
      },
    });
  };
  return (
    <div className="product-detail-content">
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {action !== 'add' ? (
        <>
          <div className="product-detail-content-left">
            {action === 'add' ? (
              <div className="loading-img">
                <CircularProgress size={56} />
              </div>
            ) : (
              <img
                src={
                  action !== 'add'
                    ? productDetail?.imageUrl
                    : 'https://i.stack.imgur.com/ATB3o.gif'
                }
                alt={productDetail?.name}
              />
            )}
          </div>
          <div className="product-detail-content-right">
            <h1 className="product-detail-content-title">
              {productDetail?.name !== ''
                ? productDetail?.name
                : 'Name of Shoes'}
            </h1>
            <p className="product-detail-content-create-at">
              {productDetail?.createdAt
                ? moment(productDetail?.createdAt).format(
                    'HH:mm:ss, DD/MM/YYYY'
                  )
                : moment().format('HH:mm:ss, DD/MM/YYYY')}
            </p>
            <table className="mt-1">
              <tbody>
                {productDetail?.description !== 'undefined' ? (
                  <tr>
                    <td>Description:</td>
                    <td>{productDetail?.description}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>Type:</td>
                  <td>
                    {/* {+productDetail.typeId === 1 ? 'Food' : 'Drink'} */}
                    {productDetail?.typeId}
                  </td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>
                    {productDetail?.isConfirmed ? (
                      <span className="confirmed">Đã phê duyệt</span>
                    ) : (
                      <span className="unconfirmed">Chưa phê duyệt</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Price:</td>
                  <td>
                    {productDetail?.unitPrice}{' '}
                    <label className="label-vnd">VND</label>
                  </td>
                </tr>
                {productDetail?.discountOff ? (
                  <tr>
                    <td>Discount Off:</td>
                    <td>
                      {productDetail?.discountOff}{' '}
                      <label className="label-vnd">%</label>
                    </td>
                  </tr>
                ) : null}
                {productDetail?.discountMaximum ? (
                  <tr>
                    <td>Discount Max:</td>
                    <td>
                      {productDetail?.discountMaximum}{' '}
                      <label className="label-vnd">VND</label>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            {action === 'view' ? (
              <div className="product-detail-content-button">
                <button
                  className="button-edit-product"
                  onClick={handleClickEditProduct}
                >
                  Edit
                </button>
                <button
                  className="button-del-product"
                  onClick={handleClickDelete}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
      {action === 'view' ? (
        !productDetail?.isConfirmed ? (
          <button className="verify-button" onClick={handleVerifyProduct}>
            <i className="fas fa-check mr-4"></i>
            Verify
          </button>
        ) : null
      ) : (
        <button className="save-button" onClick={saveProductClick}>
          <i className="fas fa-check mr-4"></i>
          Save
        </button>
      )}
    </div>
  );
};
export default ProductDetailContent;
