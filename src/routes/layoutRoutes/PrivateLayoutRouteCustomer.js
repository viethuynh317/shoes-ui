/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateLayoutRoutesCustomer = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <>
        {!!localStorage.getItem('customerToken') ? (
          <Component {...routeProps} />
        ) : (
          <Redirect exact to="/user/sign-in" />
        )}
        {/* <Admin>
          <Component {...routeProps} />
        </Admin> */}
      </>
    )}
  />
);
PrivateLayoutRoutesCustomer.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

PrivateLayoutRoutesCustomer.defaultProps = {};

export default PrivateLayoutRoutesCustomer;
