import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Context } from "./include/js/context";

import Dashboard from "./modules/dashboard/Dashboard";
import Login from "./modules/system/Login";
import ChangePassword from "./modules/system/Change_Password";
import Settings from "./modules/settings/Settings";

import QualityAssurance from "./modules/qualityAssurance/Quality_Assurance";
import QCReceive from "./modules/qualityAssurance/QC_Receive";
import QualityTest from "./modules/qualityAssurance/QC_Quality_Test";

import Inventory from "./modules/inventory/Inventory";

import Receive from "./modules/inventory/Receive";
import ReceiveCreate from "./modules/inventory/Receive_Create";
import ReceiveView from "./modules/inventory/Receive_View";

import Issue from "./modules/inventory/Issue";
import IssueView from "./modules/inventory/Issue_View";
import IssueCreate from "./modules/inventory/Issue_Create";

import Disburse from "./modules/inventory/Disburse";
import DisburseView from "./modules/inventory/Disburse_View";
import DisburseCreate from "./modules/inventory/Disburse_Create";

import Purchase from "./modules/purchasing/Purchase";
import PurchPR from "./modules/purchasing/Purchase_PR";
import PurchPRCreate from "./modules/purchasing/Purchase_PR_Create";
import PurchPRView from "./modules/purchasing/Purchase_PR_View";
import PurchPO from "./modules/purchasing/Purchase_PO";
import PurchPOCreate from "./modules/purchasing/Purchase_PO_Create";
import PurchPOView from "./modules/purchasing/Purchase_PO_View";
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
import Customer from "./modules/sales/Customer";
import CustomerView from "./modules/sales/Customer_View";
import CustomerCreate from "./modules/sales/Customer_Create";

import Production from "./modules/production/Production";
// Operation
import WorkOrderMain from "./modules/production/Operation/WorkOrderMain";
import WorkOrderCreate from "./modules/production/Operation/WorkOrderCreate";
// Master Data
import WorkCenter from "./modules/production/WorkCenter";
import WorkCenterCreate from "./modules/production/WorkCenterCreate";
import WorkCenterView from "./modules/production/WorkCenterView";
import Machine from "./modules/production/Machine";
import MachineCreate from "./modules/production/MachineCreate";
import MachineView from "./modules/production/MachineView";

import NotFound from "./modules/dashboard/NotFound";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import Location from "./modules/inventory/Location";

import Warehouse from "./modules/inventory/warehouse";
import Items from "./modules/inventory/Items";
import StockMove from "./modules/inventory/StockMove";
import StockOnHand from "./modules/inventory/StockOnHand";
import ItemCreate from "./modules/inventory/ItemCreate";
import ItemView from "./modules/inventory/ItemView";
import { log_detail } from "./modules/system/configs/log";
import { keep_log } from "./actions/comment&log";
import Authorize from "./modules/system/Authorize";
import QCItemTestMain from "./modules/qualityAssurance/MasterData/QCItemTest/QCItemTestMain";
import QCItemTestCreate from "./modules/qualityAssurance/MasterData/QCItemTest/QCItemTestCreate";
const initialContext = {
  log_detail: log_detail,
  authorize: {
    status: false,
  },
};
// class App extends Component {
const App = (props) => {
  const [context, setContext] = useState(initialContext);

  useEffect(() => {
    context.log_detail.user_name && keep_log(context);
  }, [context]);

  return (
    <Provider store={store}>
      <Context.Provider value={[context, setContext]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/change_password">
              <ChangePassword />
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
            <Route
              exact
              path="/inventory/issue/create"
              component={IssueCreate}
            />
            <Route
              exact
              path="/inventory/issue/edit/:id"
              component={IssueCreate}
            />
            <Route
              exact
              path="/inventory/issue/view/:id"
              component={IssueView}
            />

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
            <Route
              exact
              path="/inventory/disburse/view/:id"
              component={DisburseView}
            />

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
            <Route
              exact
              path="/inventory/items/view/:id"
              component={ItemView}
            />
            <Route
              exact
              path="/inventory/items/create"
              component={ItemCreate}
            />
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
            <Route
              exact
              path="/purchase/pr/edit/:id"
              component={PurchPRCreate}
            />

            <Route exact path="/purchase/po">
              <PurchPO />
            </Route>
            <Route exact path="/purchase/po/create">
              <PurchPOCreate />
            </Route>
            <Route
              exact
              path="/purchase/po/edit/:id"
              component={PurchPOCreate}
            />
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
            <Route exact path="/qa/master_data/quality_test_item">
              {/* <QCItemTestMain /> */}
              <QualityTest />
            </Route>
            <Route exact path="/qa/master_data/quality_test_item/create">
              <QCItemTestCreate />
            </Route>
            {/* <Route
              exact
              path="/qa/master_data/quality_test_item/view/:id"
              component={QCItemTestView}
            /> */}
            <Route
              exact
              path="/qa/master_data/quality_test_item/edit/:id"
              component={QCItemTestCreate}
            />
            {/* PRODUCTION */}
            <Route exact path="/production">
              <Production />
            </Route>
            {/* PRODUCTION OPERATION */}
            <Route exact path="/production/operations/wo">
              <WorkOrderMain />
            </Route>
            <Route exact path="/production/operations/wo/create">
              <WorkOrderCreate />
            </Route>

            {/* PRODUCTION MASTER DATA */}
            <Route exact path="/production/work_center">
              <WorkCenter />
            </Route>
            <Route exact path="/production/work_center/create">
              <WorkCenterCreate />
            </Route>
            <Route
              exact
              path="/production/work_center/view/:id"
              component={WorkCenterView}
            />
            <Route
              exact
              path="/production/work_center/edit/:id"
              component={WorkCenterCreate}
            />

            <Route exact path="/production/machine">
              <Machine />
            </Route>
            <Route exact path="/production/machine/create">
              <MachineCreate />
            </Route>
            <Route
              exact
              path="/production/machine/view/:id"
              component={MachineView}
            />
            <Route
              exact
              path="/production/machine/edit/:id"
              component={MachineCreate}
            />

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  );
};
// }

export default App;
