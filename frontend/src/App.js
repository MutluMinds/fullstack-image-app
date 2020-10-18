import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from './components/navbar/navbar';
import SearchViewer from './components/searchViewer/searchViewer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/giphy">
            <SearchViewer />
          </Route>
          <Route path="/pixabay">
            <h1>Second Page</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
