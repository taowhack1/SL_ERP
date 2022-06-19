import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ReportSOInventory from "./so_inventory";
import ReportSOProduction from "./so_production";

const AccountingReporting = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/so_inventory`}>
        <ReportSOInventory />
      </Route>
      <Route path={`${path}/so_production`}>
        <ReportSOProduction />
      </Route>
    </Switch>
  );
};

export default AccountingReporting;
