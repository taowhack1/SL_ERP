import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Inventory from './modules/inventory/Inventory'
import Create from './modules/inventory/Create'
import NotFound from './dashboard/NotFound'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Dashboard/></Route>
          <Route exact path="/inventory"><Inventory/></Route>
          <Route exact path="/inventory/create"><Create/></Route>
          <Route><NotFound/></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
