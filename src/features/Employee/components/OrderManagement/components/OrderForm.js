import { Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Controls from '../../../../../components/controls/Controls';
import { Form, useForm } from '../../../../../hooks/customHooks/useForm';
import ComboBox from '../../../../../components/controls/ComboBox';

const roleItems = [
  { id: 0, title: 'Chờ xác nhận' },
  { id: 1, title: 'Chờ lấy hàng' },
  { id: 2, title: 'Đang giao hàng' },
  { id: 3, title: 'Đã giao hàng' },
  { id: 4, title: 'Thành công' },
];

const initialFValues = {
  _id: '',
  customerName: '',
  address: '',
  total: 0,
  statusId: 0,
  paymentMethod: '',
  merchandiseSubtotal: 0,
  shipmentFee: 0,
  code: '',
  shipperId: '',
  isPaid: false,
  paymentCode: '',
  createAt: new Date(),
  updateAt: new Date(),
};

export default function OrderForm(props) {
  const { updateOrder, recordForEdit, nameButton, statusId, shippersInOrder } =
    props;

  const listShippers = shippersInOrder.map((shipper) => ({
    value: shipper._id,
    name: shipper.fullName,
  }));

  listShippers.unshift({ name: '--------------------', value: null });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('code' in fieldValues)
      temp.code = fieldValues.code ? '' : 'This field is required.';

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleInputBlur,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const tempStatusId = useRef(statusId);

  const isDisable =
    (Number(tempStatusId.current) === 2) | (Number(tempStatusId.current) === 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateOrder(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Customer"
            name="customer"
            value={values.customerName}
            disabled
          />

          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            disabled
          />

          <Controls.Input
            name="merchandiseSubtotal"
            label="Merchandise Subtotal"
            value={values.merchandiseSubtotal.toString()}
            disabled
          />

          <Controls.Input
            name="shipmentFee"
            label="Shipment Fee"
            value={values.shipmentFee.toString()}
            disabled
          />

          <Controls.Input
            name="total"
            label="Total"
            value={values.total.toString()}
            onBlur={handleInputBlur}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="statusId"
            label="Status"
            value={+values.statusId}
            onChange={handleInputChange}
            items={roleItems}
            disabled={isDisable ? true : null}
            indexs={[
              +tempStatusId.current - 1,
              +tempStatusId.current,
              +tempStatusId.current + 1,
            ]}
          />
          <Controls.Input
            label="Code*"
            name="code"
            value={+values.statusId === 2 ? values.paymentCode : ''}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.code}
            disabled={true}
          />

          <ComboBox
            options={listShippers}
            onChange={handleInputChange}
            name="shipperId"
            title="Shippers"
            value={values.shipperName || null}
            disabled={
              +tempStatusId.current === 1 && +values.statusId === 2
                ? false
                : true
            }
          />
          <Controls.Input
            label="Status Paid"
            name="isPaid"
            value={values.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.code}
            disabled={true}
          />
          <div>
            <Controls.Button
              type="submit"
              text={nameButton}
              disabled={isDisable ? true : null}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

OrderForm.propTypes = {
  recordForEdit: PropTypes.instanceOf(Object),
  updateOrder: PropTypes.func,
  statusId: PropTypes.string,
  nameButton: PropTypes.string,
  shippersInOrder: PropTypes.instanceOf(Array),
};

OrderForm.defaultProps = {
  recordForEdit: {},
  updateOrder: null,
  statusId: '',
  nameButton: '',
  shippersInOrder: [],
};
