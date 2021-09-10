/** @format */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Lineindex from ".";
import LineForm from "./LineForm";

const LineRouter = () => {
  const { path } = useRouteMatch();
  console.log("path", path);
  return (
    <Switch>
      <Route path={`${path}/create/`} component={LineForm} />
      <Route path={path}>
        <Lineindex />
      </Route>
    </Switch>
  );
};

export default LineRouter;
