import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ReportSOCostAndProfit from "./costAndProfit";
import ReportSOProduction from "./so_production";

const AccountingReporting = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/so_cost_and_profit`}>
        <ReportSOCostAndProfit />
      </Route>
      <Route path={`${path}/so_production`}>
        <ReportSOProduction />
      </Route>
    </Switch>
  );
};

export default AccountingReporting;
