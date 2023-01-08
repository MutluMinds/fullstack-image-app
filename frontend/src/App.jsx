import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Corner from "./components/Corner/Corner";
import Router from "./router";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      <Navbar setInputValue={setSearchValue}/>
      <Corner />
      <Router searchWord={searchValue} setSearchWord={setSearchValue}/>
    </div>
  );
}

export default App;
