/** @format */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DeliveryOrder from "./DeliveryOrder";
import DeliveryOrderForm from "./DeliveryOrderForm";
import DeliveryOrderFormView from "./DeliveryOrderFormView";

const DeliveryRouter = () => {
  const { path } = useRouteMatch();
  console.log("path", path);
  return (
    <Switch>
      <Route exact path={`${path}/view/:id`}>
        <DeliveryOrderFormView />
      </Route>
      <Route path={`${path}/edit/:id`}>
        <DeliveryOrderForm />
      </Route>
      <Route path={`${path}/create/`} component={DeliveryOrderForm} />

      <Route path={path}>
        <DeliveryOrder />
      </Route>
    </Switch>
  );
};

export default DeliveryRouter;
