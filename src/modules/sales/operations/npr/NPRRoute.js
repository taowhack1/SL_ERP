import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NPRList from ".";
import NPRListForPU from "./pu";
import NPRViewById from "./NPRViewById";

const NPRRoute = () => {
  const { path } = useRouteMatch();
  const test = useRouteMatch();
  console.log("path", path, test);
  return (
    <Switch>
      <Route path={`${path}/:department/:id`}>
        <NPRViewById />
      </Route>
      <Route path={`${path}/rd`}>
        <NPRList />
      </Route>
      <Route path={`${path}/pu`}>
        <NPRListForPU />
      </Route>
      <Route path={path}>
        <h1>Hello NPR</h1>
      </Route>
    </Switch>
  );
};

export default NPRRoute;
