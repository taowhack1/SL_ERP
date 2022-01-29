import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MRPForm from "./MRPForm";
import MRPv2 from "./v2";
const MRPRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <MRPv2 />
      </Route>
      <Route path={`${path}/:action/:id`}>
        <MRPForm />
      </Route>
      <Route path={`${path}/:action`}>
        <MRPForm />
      </Route>
    </Switch>
  );
};

export default React.memo(MRPRoutes);
