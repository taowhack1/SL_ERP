import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
const initialState = {
  salary: 15000
}
function reducers(state=initialState, action){
  switch(action.type){
    case 'ADD':
      return {...state, salary: state.salary + action.payload}
    case 'DEL':
      return {...state, salary: state.salary - action.payload}
    default:
      return state;
  }
}

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);