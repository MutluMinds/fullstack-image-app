import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Corner from "./components/Corner/Corner";
import Router from "./router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Corner />
      <Router />
    </div>
  );
}

export default App;
