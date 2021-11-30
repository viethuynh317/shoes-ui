/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Admin from "../../features/admin/Admin";
import { getLocalStorageToken } from "../../services/tokenConfig";

const PrivateLayoutRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <>
        {/* {!!getLocalStorageToken() ? (
          <Admin>
            <Component {...routeProps} />
          </Admin>
        ) : (
          <Redirect exact to="/auth/sign_in" />
        )} */}
        <Admin></Admin>
      </>
    )}
  />
);
PrivateLayoutRoutes.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

PrivateLayoutRoutes.defaultProps = {};

export default PrivateLayoutRoutes;
