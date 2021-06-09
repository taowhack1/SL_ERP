import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import NPRList from ".";
import NPRListForPU from "./pu";

const NPRRouteByDepartment = () => {
  const { path } = useRouteMatch();

  const routetest = useRouteMatch();
  const { department } = useParams();
  console.log(routetest, path, department);
  return (
    <Switch>
      <Route path={`${path}/rd`}>
        <NPRList />
      </Route>
      <Route path={`${path}/pu`}>
        <NPRListForPU />
      </Route>
    </Switch>
  );
};

export default NPRRouteByDepartment;
