/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Employee from '../../features/Employee/Employee';
import { getLocalStorageToken } from '../../services/tokenConfig';

const PrivateLayoutRoutesEmployee = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <>
        {!!getLocalStorageToken() &&
        JSON.parse(localStorage.getItem('roleId')) === 2 ? (
          <Employee>
            <Component {...routeProps} />
          </Employee>
        ) : (
          <Redirect exact to="/auth/sign_in" />
        )}
        {/* <Admin>
          <Component {...routeProps} />
        </Admin> */}
      </>
    )}
  />
);
PrivateLayoutRoutesEmployee.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

PrivateLayoutRoutesEmployee.defaultProps = {};

export default PrivateLayoutRoutesEmployee;
