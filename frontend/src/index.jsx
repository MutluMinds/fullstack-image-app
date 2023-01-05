import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/main.scss";
import { BrowserRouter as Router} from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
