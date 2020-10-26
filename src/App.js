import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./modules/system/Login";
import Settings from "./modules/settings/Settings";

import QualityAssurance from "./modules/qualityAssurance/Quality_Assurance";
import QCReceive from "./modules/inventory/Stock_QC";

import Inventory from "./modules/inventory/Inventory";

import Receive from "./modules/inventory/Receive";
import ReceiveCreate from "./modules/inventory/Receive_Create";
import ReceiveView from "./modules/inventory/Receive_View";

import Issue from "./modules/inventory/Issue";
import IssueView from "./modules/inventory/Issue_View";
import IssueCreate from "./modules/inventory/Issue_Create";

import Disburse from "./modules/inventory/Disburse";
// import DisburseView from "./modules/inventory/Disburse_View";
import DisburseCreate from "./modules/inventory/Disburse_Create";

import Purchase from "./modules/purchasing/Purchase";
import PurchPR from "./modules/purchasing/Purchase_PR";
import PurchPRCreate from "./modules/purchasing/Purchase_PR_Create";
import PurchPRView from "./modules/purchasing/Purchase_PR_View";
import PurchPO from "./modules/purchasing/Purchase_PO";
import PurchPOCreate from "./modules/purchasing/Purchase_PO_Create";
import PurchPOView from "./modules/purchasing/Purchase_PO_View";
import PurchaseItems from "./modules/purchasing/Purchase_Items";
import PurchaseItemCreate from "./modules/purchasing/Purchase_ItemCreate";
import PurchaseItemView from "./modules/purchasing/Purchase_ItemView";
import Vendor from "./modules/purchasing/Vendor";
import VendorCreate from "./modules/purchasing/Vendor_Create";
import VendorView from "./modules/purchasing/Vendor_View";

import Sales from "./modules/sales/Sales";
import Quotations from "./modules/sales/Sales_Quotations";
import QuotationsCreate from "./modules/sales/Sales_Quotations_Create";
import QuotationsView from "./modules/sales/Sales_Quotations_View";
import SaleOrder from "./modules/sales/Sales_Orders";
import SaleOrderView from "./modules/sales/Sales_Orders_View";
import SaleOrderCreate from "./modules/sales/Sales_Orders_Create";
import SaleItems from "./modules/sales/Sales_Items";
import SaleItemView from "./modules/sales/Sales_ItemView";
import Customer from "./modules/sales/Customer";
import CustomerView from "./modules/sales/Customer_View";
import CustomerCreate from "./modules/sales/Customer_Create";

import NotFound from "./dashboard/NotFound";
import { Provider } from "react-redux";
import store from "./store";
import Location from "./modules/inventory/Location";

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
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Dashboard />
          </Route>

          <Route exact path="/settings">
            <Settings />
          </Route>

          {/* INVENTORY */}
          <Route exact path="/inventory">
            <Inventory />
          </Route>

          {/* INVENTORY OPERATIONS */}
          {/* ISSUE */}
          <Route exact path="/inventory/issue">
            <Issue />
          </Route>
          <Route exact path="/inventory/issue/create" component={IssueCreate} />
          <Route
            exact
            path="/inventory/issue/edit/:id"
            component={IssueCreate}
          />
          <Route exact path="/inventory/issue/view/:id" component={IssueView} />

          {/* DISBURSE */}
          <Route exact path="/inventory/disburse">
            <Disburse />
          </Route>
          <Route
            exact
            path="/inventory/disburse/create"
            component={DisburseCreate}
          />
          <Route
            exact
            path="/inventory/disburse/edit/:id"
            component={DisburseCreate}
          />
          {/* <Route exact path="/inventory/disburse/view/:id" component={DisburseView} /> */}

          {/* RECEIVE */}
          <Route exact path="/inventory/receive">
            <Receive />
          </Route>
          <Route exact path="/inventory/receive/create">
            <ReceiveCreate />
          </Route>
          <Route
            exact
            path="/inventory/receive/edit/:id"
            component={ReceiveCreate}
          />
          <Route
            exact
            path="/inventory/receive/view/:id"
            component={ReceiveView}
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
            <PurchPR />
          </Route>
          <Route exact path="/purchase/pr/create">
            <PurchPRCreate />
          </Route>
          <Route exact path="/purchase/pr/view/:id" component={PurchPRView} />
          <Route exact path="/purchase/pr/edit/:id" component={PurchPRCreate} />

          <Route exact path="/purchase/po">
            <PurchPO />
          </Route>
          <Route exact path="/purchase/po/create">
            <PurchPOCreate />
          </Route>
          <Route exact path="/purchase/po/edit/:id" component={PurchPOCreate} />
          <Route exact path="/purchase/po/view/:id" component={PurchPOView} />

          <Route exact path="/purchase/vendor">
            <Vendor />
          </Route>
          <Route exact path="/purchase/vendor/create">
            <VendorCreate />
          </Route>
          <Route
            exact
            path="/purchase/vendor/view/:id"
            component={VendorView}
          />
          <Route
            exact
            path="/purchase/vendor/edit/:id"
            component={VendorCreate}
          />
          <Route exact path="/purchase/items">
            <PurchaseItems />
          </Route>
          <Route exact path="/purchase/items/create">
            <PurchaseItemCreate />
          </Route>
          <Route
            exact
            path="/purchase/items/view/:id"
            component={PurchaseItemView}
          />
          <Route
            exact
            path="/purchase/items/edit/:id"
            component={PurchaseItemCreate}
          />

          {/* SALES */}
          <Route exact path="/sales">
            <Sales />
          </Route>

          {/* SALES  Quotations */}
          <Route exact path="/sales/quotations">
            <Quotations />
          </Route>
          <Route exact path="/sales/quotations/create">
            <QuotationsCreate />
          </Route>
          <Route
            exact
            path="/sales/quotations/view/:id"
            component={QuotationsView}
          />
          <Route
            exact
            path="/sales/quotations/edit/:id"
            component={QuotationsCreate}
          />
          {/* SALES ORDERS */}
          <Route exact path="/sales/orders">
            <SaleOrder />
          </Route>
          <Route exact path="/sales/orders/create">
            <SaleOrderCreate />
          </Route>
          <Route
            exact
            path="/sales/orders/view/:id"
            component={SaleOrderView}
          />
          <Route
            exact
            path="/sales/orders/edit/:id"
            component={SaleOrderCreate}
          />

          {/* SALES MASTER DATA */}
          <Route exact path="/sales/items">
            <SaleItems />
          </Route>
          <Route exact path="/sales/items/view/:id" component={SaleItemView} />

          {/* SALES CONFIGURATION */}
          <Route exact path="/sales/config/customers">
            <Customer />
          </Route>
          <Route exact path="/sales/config/customers/create">
            <CustomerCreate />
          </Route>
          <Route
            exact
            path="/sales/config/customers/view/:id"
            component={CustomerView}
          />
          <Route
            exact
            path="/sales/config/customers/edit/:id"
            component={CustomerCreate}
          />

          {/* QA QC */}
          <Route exact path="/qa">
            <QualityAssurance />
          </Route>
          <Route exact path="/qa/qc/receive">
            <QCReceive />
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
