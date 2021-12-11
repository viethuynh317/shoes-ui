import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Controls from '../../../../../components/controls/Controls';
import { Form, useForm } from '../../../../../hooks/customHooks/useForm';

const roleItems = [
  { id: 1, title: 'Customer' },
  { id: 2, title: 'Employee' },
];

const initialFValues = {
  _id: '',
  email: '',
  password: '',
  roleId: 2,
  fullName: '',
  phoneNumber: '',
  address: '',
  birthday: new Date(),
};

export default function EmployeeForm(props) {
  const {
    addOrEdit,
    recordForEdit,
    nameButton,
    isShowPasswordField,
    isDisableEmail,
  } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required.';

    if ('birthday' in fieldValues)
      temp.birthday =
        fieldValues.birthday === null ? 'This field is required.' : '';

    if ('email' in fieldValues)
      temp.email =
        fieldValues.email.length === 0
          ? 'This field is required'
          : fieldValues.email.match(/^[^\s@]+@[^\s@]+$/)
          ? ''
          : 'Email is not valid.';

    if ('phoneNumber' in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber.length === 0
          ? 'This field is required'
          : fieldValues.phoneNumber.length > 9 &&
            fieldValues.phoneNumber.length < 12
          ? ''
          : 'Min 10 and max 11 numbers required.';

    if ('password' in fieldValues)
      temp.password =
        fieldValues.password.length === 0
          ? 'This field is required'
          : fieldValues.password.match(
              /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/
            )
          ? ''
          : 'Minimum six characters, at least one uppercase letter, one lowercase letter and one special character.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
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
            label="Email*"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.email}
            isDisableEmail={isDisableEmail}
          />
          {isShowPasswordField && (
            <Controls.Input
              label="Password*"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.password}
            />
          )}
          <Controls.Input
            name="fullName"
            label="Full Name*"
            value={values.fullName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.fullName}
          />
          <Controls.Input
            label="Phone Number*"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="role"
            label="Role"
            value={values.roleId}
            onChange={handleInputChange}
            items={roleItems}
            disable={true}
          />
          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
          />
          {/* <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          /> */}
          {/* <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          /> */}
          <Controls.DatePicker
            name="birthday"
            label="Birthday*"
            value={values.birthday}
            onChange={handleInputChange}
            error={errors.birthday}
          />

          <div>
            <Controls.Button type="submit" text={nameButton} />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
