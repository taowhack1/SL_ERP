import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MRPForm from "./MRPForm";
const MRPRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
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
