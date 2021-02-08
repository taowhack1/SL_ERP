import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ReturnForm from "./ReturnForm";
import ReturnFormView from "./ReturnFormView";
import ReturnList from "./ReturnList";

const ReturnRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/edit/:id`}>
        <ReturnForm />
      </Route>
      <Route path={`${path}/view/:id`}>
        <ReturnFormView />
      </Route>
      <Route path={`${path}/create`}>
        <ReturnForm />
      </Route>
      <Route path={`${path}`}>
        <ReturnList />
      </Route>
    </Switch>
  );
};

export default ReturnRoutes;
