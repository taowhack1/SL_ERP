import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

import Inventory from "./modules/inventory/Inventory";
import RequisitionView from "./modules/inventory/RequisitionView";
import RequisitionCreate from "./modules/inventory/RequisitionCreate";

import Purchasing from "./modules/purchasing/Purchasing";
import CreatePurchasing from "./modules/purchasing/CreatePurchasing";

import NotFound from "./dashboard/NotFound";
import { Provider } from "react-redux";
import store from "./store";
import Location from "./modules/inventory/Location";
import Requisition from "./modules/inventory/Requisition";
import Warehouse from "./modules/inventory/warehouse";
import Items from "./modules/inventory/Items";
import StockMove from "./modules/inventory/StockMove";
import StockOnHand from "./modules/inventory/StockOnHand";

// class App extends Component {
const App = (props) => {
  // render() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          {/* INVENTORY */}
          <Route exact path="/inventory">
            <Inventory />
          </Route>

          {/* INVENTORY OPERATIONS */}
          <Route exact path="/inventory/requisition">
            <Requisition />
          </Route>
          <Route
            exact
            path="/inventory/requisition/create"
            component={RequisitionCreate}
          />
          <Route
            exact
            path="/inventory/requisition/edit/:id"
            component={RequisitionCreate}
          />
          <Route
            exact
            path="/inventory/requisition/view/:id"
            component={RequisitionView}
          />

          {/* INVENTORY MASTER DATA */}
          <Route exact path="/inventory/items">
            <Items />
          </Route>

          {/* INVENTORY CONFIGURATION */}
          <Route exact path="/inventory/warehouse">
            <Warehouse />
          </Route>
          <Route exact path="/inventory/location">
            <Location />
          </Route>

          {/* INVENTORY REPORT */}
          <Route exact path="/inventory/stock_move">
            <StockMove />
          </Route>
          <Route exact path="/inventory/stock_on_hand">
            <StockOnHand />
          </Route>

          {/* PURCHASE */}
          <Route exact path="/purchasing">
            <Purchasing />
          </Route>
          <Route exact path="/purchasing/create">
            <CreatePurchasing />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
// }

export default App;
