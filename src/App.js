import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import NotFound from './pages/NotFound'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/create"><Create/></Route>
          <Route><NotFound/></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
