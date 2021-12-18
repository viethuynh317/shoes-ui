/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicLayoutRouteCustomer = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          {!!localStorage.getItem('customerToken') &&
          JSON.parse(localStorage.getItem('customerRoleId')) === 1 ? (
            <Redirect exact to="/user/homepage" />
          ) : (
            <Component {...routeProps} />
          )}
        </>
      )}
    />
  );
};

PublicLayoutRouteCustomer.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

PublicLayoutRouteCustomer.defaultProps = {};

export default PublicLayoutRouteCustomer;
