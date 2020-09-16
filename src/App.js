import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'

import Inventory from './modules/inventory/Inventory'
import CreateInventory from './modules/inventory/CreateInventory'

import Purchasing from './modules/purchasing/Purchasing'
import CreatePurchasing from './modules/purchasing/CreatePurchasing'

import NotFound from './dashboard/NotFound'

class App extends Component {
  render(){ 
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Dashboard/></Route>

          <Route exact path="/inventory"><Inventory/></Route>
          <Route exact path="/inventory/create"><CreateInventory/></Route>

          <Route exact path="/purchasing"><Purchasing/></Route>
          <Route exact path="/purchasing/create"><CreatePurchasing/></Route>

          <Route><NotFound/></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
