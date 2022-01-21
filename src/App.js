/** @format */

import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { AppContext, Context } from "./include/js/context";

import Dashboard from "./modules/dashboard/Dashboard";
import Login from "./modules/system/Login";
import ChangePassword from "./modules/system/Change_Password";
import Settings from "./modules/settings/Settings";

import QualityAssurance from "./modules/qualityAssurance/Quality_Assurance";
import QCReceive from "./modules/qualityAssurance/QC_Receive";

import Inventory from "./modules/inventory/Inventory";

import Receive from "./modules/inventory/operations/receive/Receive";
import ReceiveCreate from "./modules/inventory/operations/receive/Receive_Create";
import ReceiveRoute from "./modules/inventory/operations/receive/ReceiveRoute";
import ReceivePDCreate from "./modules/inventory/operations/receive_production/ReceivePDCreate";
import ReceivePDList from "./modules/inventory/operations/receive_production/ReceivePDList";

import Issue from "./modules/inventory/Issue";
import IssueView from "./modules/inventory/Issue_View";
import IssueCreate from "./modules/inventory/Issue_Create";

import Disburse from "./modules/inventory/operations/disburse/Disburse";
import DisburseView from "./modules/inventory/operations/disburse/Disburse_View";
import DisburseCreate from "./modules/inventory/operations/disburse/Disburse_Create";

import Purchase from "./modules/purchasing/Purchase";
import PurchPR from "./modules/purchasing/Purchase_PR";
import PurchPRCreate from "./modules/purchasing/Purchase_PR_Create";
import PurchPRView from "./modules/purchasing/Purchase_PR_View";
import POFormDisplay from "./modules/purchasing/po/POFormDisplay";
import Vendor from "./modules/purchasing/masterData/vendor/Vendor";
import VendorCreate from "./modules/purchasing/masterData/vendor/Vendor_Create";
import VendorView from "./modules/purchasing/masterData/vendor/Vendor_View";

import Sales from "./modules/sales/Sales";
import Quotations from "./modules/sales/operations/quotations/SalesQN";
import QuotationsCreate from "./modules/sales/operations/quotations/SalesQNCreate";
import QuotationsView from "./modules/sales/operations/quotations/SalesQNView";
import SaleOrder from "./modules/sales/Sales_Orders";
import SaleOrderView from "./modules/sales/Sales_Orders_View";
import SaleOrderCreate from "./modules/sales/Sales_Orders_Create";
import DeliveryRequisition from "./modules/sales/operations/dr";
import Customer from "./modules/sales/masterData/customer/Customer";
import CustomerView from "./modules/sales/masterData/customer/Customer_View";
import CustomerCreate from "./modules/sales/masterData/customer/Customer_Create";

import Production from "./modules/production/Production";
// Operation
import MRPMain from "./modules/production/operations/MRPMain";
import MRPCreate from "./modules/production/operations/MRPCreate";
import MRPView from "./modules/production/operations/MRPView";
import Planning from "./modules/production/operations/planning/PlanningCalendar";
// Master Data
import WorkCenter from "./modules/production/WorkCenter";
import WorkCenterCreate from "./modules/production/WorkCenterCreate";
import WorkCenterView from "./modules/production/WorkCenterView";
import Machine from "./modules/production/masterData/machine/Machine";
import MachineCreate from "./modules/production/masterData/machine/MachineCreate";
import MachineView from "./modules/production/masterData/machine/MachineView";

import NotFound from "./modules/dashboard/NotFound";
import { useSelector } from "react-redux";
import Location from "./modules/inventory/Location";

import Warehouse from "./modules/inventory/warehouse";
import Items from "./modules/inventory/Items";
import StockMove from "./modules/inventory/StockMove";
import StockOnHand from "./modules/inventory/StockOnHand";
import ItemCreate from "./modules/inventory/ItemCreate";
import ItemView from "./modules/inventory/ItemView";
import { log_detail } from "./modules/system/configs/log";
import { keep_log } from "./actions/comment&log";

import ConditionsMain from "./modules/qualityAssurance/MasterData/conditions/ConditionsMain";
import ConditionsForm from "./modules/qualityAssurance/MasterData/conditions/ConditionsForm";
import ItemType from "./modules/inventory/item/masterData/type/ItemType";
import Type from "./modules/inventory/configurations/type/Type";
import TypeCreate from "./modules/inventory/configurations/type/TypeCreate";
import TypeView from "./modules/inventory/configurations/type/TypeView";
import Category from "./modules/inventory/configurations/category/Category";
import CategoryCreate from "./modules/inventory/configurations/category/CategoryCreate";
import CategoryView from "./modules/inventory/configurations/category/CategoryView";
import UomMain from "./modules/inventory/configurations/uom/UOMMain";
import UomCreate from "./modules/inventory/configurations/uom/UOMCreate";
import UomView from "./modules/inventory/configurations/uom/UOMView";
import Transfer from "./modules/inventory/operations/transfer/Transfer";
import TransferCreate from "./modules/inventory/operations/transfer/TransferCreate";
import TransferView from "./modules/inventory/operations/transfer/TransferView";
import WorkOrderCreate1 from "./modules/production/operations/workorder/WorkOrderCreate";

import ReturnRoutes from "./modules/inventory/operations/return/ReturnRoutes";
import Routing from "./modules/production/masterData/routing/Routing";
import RoutingForm from "./modules/production/masterData/routing/RoutingForm";
import RoutingView from "./modules/production/masterData/routing/RoutingView";
import ReportQC from "./modules/qualityAssurance/reportQc/ReportQC";
import StockCard from "./modules/inventory/reporting/stockCard/StockCard";
import StockValue from "./modules/inventory/reporting/stockValue/StockValue";
import ProductionSelectMachine from "./modules/production/operations/production/production/costCenter/ProductionSelectMachine";
import ProductionMain from "./modules/production/operations/production/ProductionMain";
import TemporaryItems from "./modules/inventory/item/temporaryItem";
import TempItemCreate from "./modules/inventory/item/temporaryItem/TempItemCreate";
import TempItemForm from "./modules/inventory/item/temporaryItem/TempItemForm";
import SatisficationCategoryList from "./modules/sales/masterData/satisfication/SatisficationCategoryList";
import SatisficationForm from "./modules/sales/masterData/satisfication/SatisficationForm";
import Logout from "./modules/system/Logout";
import CompareFormulaMain from "./modules/sales/reporting/compareFormula";
import NPRRoute from "./modules/sales/operations/npr/NPRRoute";
import Estimate from "./modules/sales/operations/estimate/Estimate";
import EstimateForm from "./modules/sales/operations/estimate/EstimateForm";
import DeliveryRouter from "./modules/sales/operations/do/DeliveryRouter";
import JobOrderRoute from "./modules/production/operations/jobOrder/JobOrderRoute";
import GRReport from "./modules/inventory/reporting/gr";
import MRPTest from "./modules/production/operations/mrp-test";
import StockOnHandV2 from "./modules/inventory/StockOnHandV2";
import AdjustStock from "./modules/inventory/configurations/adjustStock";
import TimeSheet from "./modules/production/operations/timesheet/TimeSheet";
import PORoutes from "./modules/purchasing/po/PORoutes";
import UserAction from "./modules/sales/reporting/userAction/UserAction";
import SummarySo from "./modules/sales/reporting/summary_so/SummarySo";
const initialContext = {
  log_detail: log_detail,
  authorize: {
    status: false,
  },
};
const App = (props) => {
  const auth = useSelector((state) => state.auth.authData);
  const { currentProject, currentMenu } = useSelector((state) => state.auth);

  const [context, setContext] = useState(initialContext);
  useEffect(() => {
    context.log_detail.user_name && keep_log(context);
  }, [context]);

  const [mainContext, setMainContext] = useState({
    config: {},
  });
  const AppContextValue = useMemo(() => {
    return {
      mainContext,
      setMainContext,
      auth,
      currentProject,
      currentMenu,
    };
  }, [mainContext, auth, currentProject, currentMenu]);
  return (
    // <Provider store={store}>
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>
        <AppContext.Provider value={AppContextValue}>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/logout'>
              <Logout />
            </Route>
            <Route exact path='/change_password'>
              <ChangePassword />
            </Route>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route exact path='/settings'>
              <Settings />
            </Route>
            {/* INVENTORY */}
            <Route exact path='/inventory'>
              <Inventory />
            </Route>
            {/* ISSUE */}
            <Route exact path='/inventory/issue'>
              <Issue />
            </Route>
            <Route
              exact
              path='/inventory/issue/create'
              component={IssueCreate}
            />
            <Route
              exact
              path='/inventory/issue/edit/:id'
              component={IssueCreate}
            />
            <Route
              exact
              path='/inventory/issue/view/:id'
              component={IssueView}
            />
            {/* DISBURSE */}
            <Route exact path='/inventory/disburse'>
              <Disburse />
            </Route>
            <Route
              exact
              path='/inventory/disburse/create'
              component={DisburseCreate}
            />
            <Route
              exact
              path='/inventory/disburse/edit/:id'
              component={DisburseCreate}
            />
            <Route
              exact
              path='/inventory/disburse/view/:id'
              component={DisburseView}
            />
            {/* RECEIVE */}
            <Route exact path='/inventory/receive'>
              <Receive />
            </Route>
            <Route exact path='/inventory/receive/:action'>
              <ReceiveCreate />
            </Route>
            <Route
              exact
              path='/inventory/receive/:action/:id'
              component={ReceiveRoute}
            />
            {/*RECEIVE PRODUCTION */}
            <Route exact path='/inventory/receive_pd'>
              <ReceivePDList />
            </Route>
            {/* <Route exact path='/inventory/receive_pd/create'>
              <ReceivePDCreate />
            </Route> */}
            {/* INVENTORY MASTER DATA */}
            <Route exact path='/inventory/items'>
              <Items />
            </Route>
            <Route
              exact
              path='/inventory/items/view/:id'
              component={ItemView}
            />
            <Route
              exact
              path='/inventory/items/create'
              component={ItemCreate}
            />
            <Route
              exact
              path='/inventory/items/edit/:id'
              component={ItemCreate}
            />
            <Route exact path='/inventory/master_data/temp_item'>
              <TemporaryItems />
            </Route>
            <Route exact path='/inventory/master_data/temp_item/create'>
              <TempItemCreate />
            </Route>
            {/* <Route exact path="/inventory/master_data/temp_item/view/:id">
              <TempItemCreate />
            </Route> */}
            <Route exact path='/inventory/master_data/temp_item/:action/:id?'>
              <TempItemForm />
            </Route>
            {/* INVENTORY CONFIGURATION */}
            <Route exact path='/inventory/configurations/type'>
              <Type />
            </Route>
            <Route exact path='/inventory/configurations/type/create'>
              <TypeCreate />
            </Route>
            <Route
              exact
              path='/inventory/configurations/type/view/:id'
              component={TypeView}
            />
            <Route
              exact
              path='/inventory/configurations/type/edit/:id'
              component={TypeCreate}
            />
            {/* {category} */}
            <Route exact path='/inventory/configurations/category'>
              <Category />
            </Route>
            <Route exact path='/inventory/configurations/category/create'>
              <CategoryCreate />
            </Route>
            <Route
              exact
              path='/inventory/configurations/category/view/:id'
              component={CategoryView}
            />
            <Route
              exact
              path='/inventory/configurations/category/edit/:id'
              component={CategoryCreate}
            />
            <Route exact path='/inventory/configurations/uom'>
              <UomMain />
            </Route>
            {/* {uom} */}
            <Route
              exact
              path='/inventory/configurations/uom/create'
              component={UomCreate}
            />
            <Route
              exact
              path='/inventory/configurations/uom/view/:id'
              component={UomView}
            />
            <Route
              exact
              path='/inventory/configurations/uom/edit/:id'
              component={UomCreate}
            />
            <exact path='/inventory/warehouse'>
              <Warehouse />
            </exact>
            <Route exact path='/inventory/location'>
              <Location />
            </Route>
            <Route exact path='/inventory/items/type'>
              <ItemType />
            </Route>
            {/* {INVENTORY/operation/transfer} */}
            <Route exact path='/inventory/transfer'>
              <Transfer />
            </Route>
            <Route
              exact
              path='/inventory/transfer/create'
              component={TransferCreate}
            />
            <Route
              exact
              path='/inventory/transfer/view/'
              component={TransferView}
            />
            {/* INVENTORY -> OPERATIONS -> RETURN */}
            <Route path='/inventory/return'>
              <ReturnRoutes />
            </Route>
            {/* INVENTORY REPORT */}
            <Route exact path='/inventory/stock_move'>
              <StockMove />
            </Route>
            <Route exact path='/inventory/stock_on_hand'>
              <StockOnHandV2 />
            </Route>
            <Route exact path='/inventory/stock_card'>
              <StockCard />
            </Route>
            <Route exact path='/inventory/stock_value'>
              <StockValue />
            </Route>
            <Route exact path='/inventory/reporting/gr'>
              <GRReport />
            </Route>
            <Route exact path='/inventory/configurations/adjuststock'>
              <AdjustStock />
            </Route>
            {/* PURCHASE */}
            <Route exact path='/purchase'>
              <Purchase />
            </Route>
            <Route exact path='/purchase/pr'>
              <PurchPR />
            </Route>
            <Route exact path='/purchase/pr/create'>
              <PurchPRCreate />
            </Route>
            <Route exact path='/purchase/pr/view/:id' component={PurchPRView} />
            <Route
              exact
              path='/purchase/pr/edit/:id'
              component={PurchPRCreate}
            />
            <Route path='/purchase/po'>
              <PORoutes />
            </Route>
            {/* <Route exact path="/purchase/po/create">
              <PurchPOCreate />
            </Route> */}
            <Route exact path='/purchase/po/create2'>
              <POFormDisplay />
            </Route>
            {/* <Route
              exact
              path='/purchase/po/edit/:id'
              component={PurchPOCreate}
            />
            <Route exact path="/purchase/po/view/:id" component={PurchPOView} /> */}
            <Route exact path='/purchase/vendor'>
              <Vendor />
            </Route>
            <Route exact path='/purchase/vendor/create'>
              <VendorCreate />
            </Route>
            <Route
              exact
              path='/purchase/vendor/view/:id'
              component={VendorView}
            />
            <Route
              exact
              path='/purchase/vendor/edit/:id'
              component={VendorCreate}
            />
            {/* SALES */}
            <Route exact path='/sales'>
              <Sales />
            </Route>
            <Route path='/sales/operation/do'>
              <DeliveryRouter />
            </Route>
            {/* <Route exact path="/sales/operation/do/:id">
              <DeliveryOrderForm />
            </Route> */}
            <Route exact path='/sales/operation/estimate'>
              <Estimate />
            </Route>
            <Route exact path='/sales/operation/estimate/:id'>
              <EstimateForm />
            </Route>
            {/* SALES OPERATIONS */}
            <Route path='/sales/npr'>
              <NPRRoute />
            </Route>
            {/* <Route
              exact
              path="/sales/npr/pk_price/:id"
              component={NPRViewById}
            />
            <Route exact path="/sales/npr/pu" component={NPRListForPU} />

            <Route exact path="/sales/npr/rd/:id" component={NPRViewById} /> */}

            {/* SALES  Quotations */}
            <Route exact path='/sales/quotations'>
              <Quotations />
            </Route>
            <Route exact path='/sales/quotations/create'>
              <QuotationsCreate />
            </Route>
            <Route
              exact
              path='/sales/quotations/view/:id'
              component={QuotationsView}
            />
            <Route
              exact
              path='/sales/quotations/edit/:id'
              component={QuotationsCreate}
            />

            {/* SALES ORDERS */}
            <Route exact path='/sales/orders'>
              <SaleOrder />
            </Route>
            <Route
              exact
              path='/sales/orders/create'
              component={SaleOrderCreate}
            />
            <Route
              exact
              path='/sales/orders/view/:id'
              component={SaleOrderView}
            />
            <Route
              exact
              path='/sales/orders/edit/:id'
              component={SaleOrderCreate}
            />
            {/* SALES DR */}
            <Route exact path='/sales/operation/dr'>
              <DeliveryRequisition />
            </Route>

            {/* SALES REPORTING */}
            <Route exact path='/sales/reporting/compareformula'>
              <CompareFormulaMain />
            </Route>
            <Route exact path='/sales/reporting/useraction'>
              <UserAction />
            </Route>
            <Route exact path='/sales/reporting/summary_so'>
              <SummarySo />
            </Route>
            {/* SALES CONFIGURATION */}
            <Route exact path='/sales/config/customers'>
              <Customer />
            </Route>
            <Route exact path='/sales/config/customers/create'>
              <CustomerCreate />
            </Route>
            <Route
              exact
              path='/sales/config/customers/view/:id'
              component={CustomerView}
            />
            <Route
              exact
              path='/sales/config/customers/edit/:id'
              component={CustomerCreate}
            />
            <Route exact path='/sales/master/satisfication'>
              <SatisficationCategoryList />
            </Route>
            <Route exact path='/sales/master/satisfication/edit/:id'>
              <SatisficationForm />
            </Route>
            {/* QA QC */}
            <Route exact path='/qa'>
              <QualityAssurance />
            </Route>
            <Route exact path='/qa/qc/receive'>
              <QCReceive />
            </Route>
            <Route exact path='/qa/master_data/conditions'>
              <ConditionsMain />
            </Route>
            <Route
              exact
              path='/qa/master_data/conditions/:action/:id'
              component={ConditionsForm}
            />
            <Route exact path='/qa/report_qc'>
              <ReportQC />
            </Route>
            {/* PRODUCTION */}
            <Route exact path='/production'>
              <Production />
            </Route>

            {/* PRODUCTION OPERATION */}
            <Route exact path='/production/operations/planning'>
              <Planning />
              {/* <TestCalendar /> */}
            </Route>
            <Route exact path='/production/operations/mrp'>
              <MRPMain />
            </Route>
            <Route exact path='/production/operations/mrp/create'>
              <MRPCreate />
            </Route>
            <Route exact path='/production/operations/mrp-test'>
              <MRPTest />
            </Route>
            {/* PETCH ADD */}
            <Route exact path='/production/operations/workorder/'>
              <WorkOrderCreate1 />
            </Route>
            <Route
              exact
              path='/production/operations/mrp/view/:id'
              component={MRPView}
            />
            <Route
              exact
              path='/production/operations/mrp/edit/:id'
              component={MRPCreate}
            />
            {/* <PageLayout> */}
            <Route
              exact
              path='/production/operations/production'
              component={ProductionSelectMachine}
            />
            {/* <Route
              exact
              path="/production/operations/timesheet"
              component={TimeSheet}
            /> */}
            <Route
              exact
              path='/production/operations/timesheet'
              component={TimeSheet}
            />
            {/* </PageLayout> */}

            <Route path='/production/operations/job_order'>
              <JobOrderRoute />
            </Route>
            {/* PRODUCTION MASTER DATA */}
            <Route exact path='/production/work_center'>
              <WorkCenter />
            </Route>
            <Route exact path='/production/work_center/create'>
              <WorkCenterCreate />
            </Route>
            <Route
              exact
              path='/production/work_center/view/:id'
              component={WorkCenterView}
            />
            <Route
              exact
              path='/production/work_center/edit/:id'
              component={WorkCenterCreate}
            />
            <Route exact path='/production/machine'>
              <Machine />
            </Route>
            <Route exact path='/production/machine/create'>
              <MachineCreate />
            </Route>
            <Route
              exact
              path='/production/machine/view/:id'
              component={MachineView}
            />
            <Route
              exact
              path='/production/machine/edit/:id'
              component={MachineCreate}
            />
            <Route exact path='/production/routing/'>
              <Routing />
            </Route>
            <Route
              exact
              path='/production/routing/create'
              component={RoutingForm}
            />
            <Route
              exact
              path='/production/routing/:id'
              component={RoutingForm}
            />

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    </Context.Provider>
    // </Provider>
  );
};

export default App;
