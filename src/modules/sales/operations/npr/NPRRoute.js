/** @format */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NPRList from ".";
import NPRListForPU from "./pu";
import NPRViewById from "./NPRViewById";
import NPRListForPD from "./pd";
import NPRPRoductionCostForm from "./pd/NPRProductionCostForm";
import EstimateForm from "../estimate/EstimateForm";
import NPRRDForm from "./form/NPRRDForm";
const NPRRoute = () => {
  const { path } = useRouteMatch();
  const test = useRouteMatch();
  console.log("path", path, test);
  return (
    <Switch>
      <Route path={`${path}/pd/:id`}>
        <NPRPRoductionCostForm />
      </Route>
      <Route path={`${path}/:department/:id`}>
        <NPRViewById />
        {/* <NPRRDForm /> */}
      </Route>
      <Route path={`${path}/rd`}>
        <NPRList />
      </Route>

      <Route path={`${path}/pu`}>
        <NPRListForPU />
      </Route>
      <Route path={`${path}/pd`}>
        <NPRListForPD />
      </Route>

      <Route path={path}>
        <h1>Hello NPR</h1>
      </Route>
    </Switch>
  );
};

export default NPRRoute;
