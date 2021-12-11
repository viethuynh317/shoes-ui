/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Admin from '../../features/admin/Admin';
import Employee from '../../features/Employee/Employee';
import { getLocalStorageToken } from '../../services/tokenConfig';

const PrivateLayoutRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <>
        {!!getLocalStorageToken() &&
        JSON.parse(localStorage.getItem('roleId')) === 0 ? (
          <Admin>
            <Component {...routeProps} />
          </Admin>
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
PrivateLayoutRoutes.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

PrivateLayoutRoutes.defaultProps = {};

export default PrivateLayoutRoutes;
