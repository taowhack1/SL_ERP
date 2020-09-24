import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

import Inventory from "./modules/inventory/Inventory";
import RequisitionView from "./modules/inventory/RequisitionView";
import RequisitionCreate from "./modules/inventory/RequisitionCreate";

import Purchase from "./modules/purchasing/Purchase";
import PurchaseRequisition from "./modules/purchasing/PurchaseRequisition";

import NotFound from "./dashboard/NotFound";
import { Provider } from "react-redux";
import store from "./store";
import Location from "./modules/inventory/Location";
import Requisition from "./modules/inventory/Requisition";
import Warehouse from "./modules/inventory/warehouse";
import Items from "./modules/inventory/Items";
import StockMove from "./modules/inventory/StockMove";
import StockOnHand from "./modules/inventory/StockOnHand";
import ItemCreate from "./modules/inventory/ItemCreate";
import ItemView from "./modules/inventory/ItemView";

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
          <Route exact path="/inventory/items/view/:id" component={ItemView} />
          <Route exact path="/inventory/items/create" component={ItemCreate} />
          <Route
            exact
            path="/inventory/items/edit/:id"
            component={ItemCreate}
          />

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
          <Route exact path="/purchase">
            <Purchase />
          </Route>
          <Route exact path="/purchase/pr">
            <PurchaseRequisition />
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
