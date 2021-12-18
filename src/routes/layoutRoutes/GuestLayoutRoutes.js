/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

const GuestLayoutRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          <Component {...routeProps} />
        </>
      )}
    />
  );
};

GuestLayoutRoutes.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

GuestLayoutRoutes.defaultProps = {};

export default GuestLayoutRoutes;
