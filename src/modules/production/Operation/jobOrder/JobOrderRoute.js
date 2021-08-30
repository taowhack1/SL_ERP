import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import JobOrderMain from ".";
import SubJobOrder from "./subJobOrder/SubJobOrder";

const JobOrderRoute = () => {
  const { path, id } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${path}/:id`} component={SubJobOrder} />
        <Route path={`${path}`}>
          <JobOrderMain />
        </Route>
      </Switch>
    </>
  );
};

export default JobOrderRoute;
