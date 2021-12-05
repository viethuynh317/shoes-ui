import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchShoeById } from '../../commons/shoesSlice';
import ProductDetailContent from '../ProductDetailContent/ProductDetailContent';
import './index.css';
import { isNil } from 'lodash';
import { BRANDS, GENDERS } from '../../constants/globalConst';
import { FormControlLabel, Switch } from '@mui/material';

export default function EditProduct() {
  const { shoe: productDetail } = useSelector((state) => state.shoes.shoeById);
  const [productEdit, setProductEdit] = useState({
    ...productDetail,
    description: productDetail?.description || '',
    discountOff: productDetail?.discountOff || 0,
    discountMaximum: productDetail?.discountMaximum || 0,
  });
  const [productAdd, setProductAdd] = useState({
    name: '',
    typeId: 'Jordan',
    gender: 'men',
    createdAt: new Date(),
    description: '',
  });
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setProductAdd((preState) => ({
      ...preState,
      isConfirmed: event.target.checked,
    }));
  };
  const onChange = (e) => {
    let { name, value } = e.target;
    if (
      name === 'discountMaximum' ||
      name === 'discountOff' ||
      name === 'unitPrice' ||
      name === 'typeId'
    ) {
      value = parseInt(value);
    }
    if (name === 'discountOff' && value > 100) {
      value = 100;
    }

    if (
      (name === 'discountMaximum' ||
        name === 'unitPrice' ||
        name === 'discountOff') &&
      value < 0
    ) {
      value = 0;
    }
    if (id) {
      setProductEdit((productEdit) => ({ ...productEdit, [name]: value }));
    } else {
      setProductAdd((productAdd) => ({ ...productAdd, [name]: value }));
    }
  };
  const onChangeFile = (e) => {
    setProductAdd((productAdd) => ({
      ...productAdd,
      imageUrl: e.target.files[0],
    }));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNil(id)) {
      const fetchShoeByIdFn = async () => {
        const res = await dispatch(fetchShoeById(id));
        setProductEdit(res?.payload?.data?.shoe);
      };
      fetchShoeByIdFn();
    }
  }, [dispatch, id]);
  return (
    <div className="product-edit">
      <ProductDetailContent
        productDetail={id ? productEdit : productAdd}
        action={id ? 'edit' : 'add'}
      />
      <div className="form-edit-product">
        <h2 className="form-edit-title">
          {id ? `Edit ${productDetail?.name}` : `Add ${productAdd?.name}`}
        </h2>
        <form>
          {!id ? (
            <>
              <label htmlFor="image" className="label">
                Shoe Image:
              </label>
              <input
                type="file"
                id="image"
                name="imageUrl"
                className="input-food-image"
                onChange={onChangeFile}
                accept="image/*"
              ></input>
            </>
          ) : null}
          <label htmlFor="type" className="label">
            Brand
          </label>
          <select
            name="typeId"
            id="type"
            value={id ? productEdit?.typeId : productAdd?.typeId}
            onChange={onChange}
          >
            {BRANDS.map((brand, indx) => (
              <option key={indx} value={brand}>
                {brand.toUpperCase()}
              </option>
            ))}
          </select>

          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={id ? productEdit?.name : productAdd?.name}
            onChange={onChange}
          ></input>
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <select
            name="gender"
            id="gender"
            value={id ? productEdit?.gender : productAdd?.gender}
            onChange={onChange}
          >
            {GENDERS.map((gender, indx) => (
              <option key={indx} value={gender}>
                {gender.toUpperCase()}
              </option>
            ))}
          </select>

          <label htmlFor="unitPrice" className="label">
            Unit Price:
          </label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={id ? productEdit?.unitPrice : productAdd?.unitPrice}
            onChange={onChange}
          ></input>

          <label htmlFor="discountOff" className="label">
            Discount Off (%):
          </label>
          <input
            type="number"
            id="discountOff"
            name="discountOff"
            value={
              id
                ? productEdit?.discountOff
                  ? productEdit?.discountOff
                  : 0
                : productAdd?.discountOff
                ? productAdd?.discountOff
                : 0
            }
            onChange={onChange}
            max={100}
            min={0}
          ></input>
          <label For="discountMaximum" className="label">
            Discount Maximum (VND):
          </label>
          <input
            type="number"
            id="discountMaximum"
            name="discountMaximum"
            value={
              id
                ? productEdit?.discountMaximum
                  ? productEdit?.discountMaximum
                  : 0
                : productAdd?.discountMaximum
                ? productAdd?.discountMaximum
                : 0
            }
            onChange={onChange}
            min={0}
          ></input>

          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={id ? productEdit?.description : productAdd?.description}
            onChange={onChange}
          />

          {!id && (
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="confirmed"
            />
          )}
        </form>
      </div>
    </div>
  );
}
