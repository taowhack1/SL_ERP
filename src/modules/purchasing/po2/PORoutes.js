/** @format */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import POFormDisplay from "./POFormDisplay";
import PO from ".";

const PORoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/:id&:mrp`} component={POFormDisplay} />
      <Route exact path={`${path}/:id`} component={POFormDisplay} />
      <Route path={`${path}`}>
        <PO />
      </Route>
    </Switch>
  );
};

export default PORoutes;
