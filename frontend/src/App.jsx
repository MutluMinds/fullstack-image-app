import React from "react";
import ApiSelector from "./components/ApiSelector/ApiSelector";
import Corner from "./components/Corner/Corner";
import Router from "./router";

function App() {
  return (
    <div className="App">
      <ApiSelector />
      <Corner />
      <Router />
    </div>
  );
}

export default App;
