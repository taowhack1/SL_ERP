import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountingProject from "./home";
import AccountingOperations from "./operations";
import AccountingReporting from "./reporting";

const AccountingRoutes = () => {
  const { path } = useRouteMatch();
  console.log("path", path)
  return (
    <Switch>
      <Route path={`${path}/operations`}>
        <AccountingOperations />
      </Route>
      <Route path={`${path}/master_data`}>
        <h1>Master Data</h1>
      </Route>
      <Route path={`${path}/reporting`}>
        <AccountingReporting />
      </Route>
      <Route path={`${path}/configurations`}>
        <h1>Configurations</h1>
      </Route>
      <Route path={`${path}`}>
        <AccountingProject />
      </Route>
    </Switch>
  );
};

export default AccountingRoutes;
