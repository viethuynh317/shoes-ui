import React from "react";
import { Redirect, Switch } from "react-router-dom";
import PrivateLayoutRoutes from "./layoutRoutes/PrivateLayoutRoutes";
import PublicLayoutRoutes from "./layoutRoutes/PublicLayoutRoutes";
import { privateRoutes, publicRoutes } from "./routeConfig";

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

      {publicRoutes.map(({ key, exact, path, component }) => (
        <PublicLayoutRoutes
          key={key}
          exact={exact}
          path={path}
          component={component}
        />
      ))}
      <Redirect exact from="/" to="/auth/login" />
    </Switch>
  );
};

Routes.propTypes = {};

export default Routes;
