/** @format */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DeliveryOrder from "./DeliveryOrder";
import DeliveryOrderForm from "./DeliveryOrderForm";

const DeliveryRouter = () => {
  const { path } = useRouteMatch();
  console.log("path", path);
  return (
    <Switch>
      <Route path={`${path}/:action/:id`}>
        <DeliveryOrderForm />
      </Route>
      <Route path={path}>
        <DeliveryOrder />
      </Route>
    </Switch>
  );
};

export default DeliveryRouter;
