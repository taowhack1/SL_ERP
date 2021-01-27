import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
// axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_PRODUCTION;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
