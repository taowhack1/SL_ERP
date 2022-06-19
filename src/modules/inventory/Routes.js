import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import GRReport from "./reporting/gr";
import ReportIssueSO from "./reporting/issueSO";

const Routes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/issue`}>
        <ReportIssueSO />
      </Route>
      <Route exact path={`${path}/gr`}>
        <GRReport />
      </Route>
    </Switch>
  );
};

export default Routes;
