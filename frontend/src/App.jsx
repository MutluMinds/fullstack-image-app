import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Corner from "./components/Corner/Corner";
import Router from "./router";

function App() {
  const [inputValue, setInputValue] = useState("");
  
  return (
    <div className="App">
      <Navbar setInputValue={setInputValue}/>
      <Corner />
      <Router inputValue={inputValue} setInputValue={setInputValue}/>
    </div>
  );
}

export default App;
