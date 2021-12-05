/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchShoeById } from '../../commons/shoesSlice';
// import { getProductDetail } from '../../../common/components/ProductDetail/ProductDetailSlice';
import Notification from '../../components/Notification';
import ListFeedback from '../ListFeedback/ListFeedback';
import ProductDetailContent from '../ProductDetailContent/ProductDetailContent';
import './Style.css';

export default function ProductDetail() {
  const [data, setData] = useState({});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShoeByIdFn = async () => {
      const res = await dispatch(fetchShoeById(id));
      setData(res?.payload?.data);
    };
    fetchShoeByIdFn();
  }, [dispatch, id]);
  return (
    <div className="product-detail">
      <>
        <ProductDetailContent productDetail={data?.shoe} action="view" />
        <div className="product-detail-feedbacks">
          <ListFeedback listFeedback={data?.feedbacks} />
        </div>
      </>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
