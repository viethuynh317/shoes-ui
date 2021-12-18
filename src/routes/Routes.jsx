import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PrivateLayoutRoutes from './layoutRoutes/PrivateLayoutRoutes';
import PrivateLayoutRouteEmployee from './layoutRoutes/PrivateLayoutRouteEmployee';
import PublicLayoutRoutes from './layoutRoutes/PublicLayoutRoutes';
import {
  guestRoutes,
  privateRoutes,
  privateRoutesCustomer,
  privateRoutesEmployee,
  publicRoutes,
  publicRoutesCustomer,
} from './routeConfig';
import PublicLayoutRouteCustomer from './layoutRoutes/PublicLayoutRoutesCustomer';
import PrivateLayoutRoutesCustomer from './layoutRoutes/PrivateLayoutRouteCustomer';
import GuestLayoutRoutes from './layoutRoutes/GuestLayoutRoutes';

const Routes = () => {
  return (
    <Switch>
      {privateRoutes.map((route) => {
        const { key, exact, path, component } = route;
        return (
          <PrivateLayoutRoutes
            key={key}
            exact={exact}
            path={path}
            component={component}
          />
        );
      })}

      {privateRoutesEmployee.map((route) => {
        const { key, exact, path, component } = route;
        return (
          <PrivateLayoutRouteEmployee
            key={key}
            exact={exact}
            path={path}
            component={component}
          />
        );
      })}

      {publicRoutes.map(({ key, exact, path, component }) => (
        <PublicLayoutRoutes
          key={key}
          exact={exact}
          path={path}
          component={component}
        />
      ))}
      {publicRoutesCustomer.map(({ key, exact, path, component }) => (
        <PublicLayoutRouteCustomer
          key={key}
          exact={exact}
          path={path}
          component={component}
        />
      ))}
      {privateRoutesCustomer.map(({ key, exact, path, component }) => (
        <PrivateLayoutRoutesCustomer
          key={key}
          exact={exact}
          path={path}
          component={component}
        />
      ))}
      {guestRoutes.map(({ key, exact, path, component }) => (
        <GuestLayoutRoutes
          key={key}
          exact={exact}
          path={path}
          component={component}
        />
      ))}
      <Redirect exact from="/" to="/auth/sign-in" />
    </Switch>
  );
};

Routes.propTypes = {};

export default Routes;
