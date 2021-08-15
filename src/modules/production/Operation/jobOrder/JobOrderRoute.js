import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import JobOrderMain from ".";

const JobOrderRoute = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${path}`}>
          <JobOrderMain />
        </Route>
      </Switch>
    </>
  );
};

export default JobOrderRoute;
