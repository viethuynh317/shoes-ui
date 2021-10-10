/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getLocalStorageToken } from "../../services/tokenConfig";

const PublicLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          {!!getLocalStorageToken() ? (
            <Redirect exact to="/vehicle_stores" />
          ) : (
            <Component {...routeProps} />
          )}
        </>
      )}
    />
  );
};

PublicLayoutRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

PublicLayoutRoute.defaultProps = {};

export default PublicLayoutRoute;
