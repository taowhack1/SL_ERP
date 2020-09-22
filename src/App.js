import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

import Inventory from "./modules/inventory/Inventory";
import CreateInventory from "./modules/inventory/CreateInventory";

import Purchasing from "./modules/purchasing/Purchasing";
import CreatePurchasing from "./modules/purchasing/CreatePurchasing";

import NotFound from "./dashboard/NotFound";
import { Provider } from "react-redux";
import store from "./store";
import Location from "./modules/inventory/Location";
import Requisition from "./modules/inventory/Requisition";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/inventory">
              <Inventory />
            </Route>
            <Route exact path="/inventory/location">
              <Location />
            </Route>
            <Route exact path="/inventory/requisition">
              <Requisition />
            </Route>
            <Route exact path="/inventory/requisition/create">
              <CreateInventory />
            </Route>

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
  }
}

export default App;
