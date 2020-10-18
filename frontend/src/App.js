import React from 'react';
import Navbar from './components/navbar/navbar';
import SearchViewer from './components/searchViewer/searchViewer';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <SearchViewer />
    </div>
  );
}

export default App;
