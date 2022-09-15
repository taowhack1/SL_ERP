import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import InputTax from "./tax";

const AccountingOperations = () => {
  const { path } = useRouteMatch();
  console.log("operations")
  return (
    <Switch>
      <Route path={`${path}/so_tax`}>
        <InputTax />
      </Route>
    </Switch>
  );
};

export default AccountingOperations;
