import React, { useState } from "react";
import { APIS } from "./static/constants";

import Navbar from "./components/Navbar/Navbar";
import Corner from "./components/Corner/Corner";
import GalleryPage from "./pages/GalleryPage";

function App() {
  const [apiType, setImageType] = useState(APIS.giphy);

  return (
    <div className="App">
      <Navbar onChange={(value) => setImageType(value)} value={apiType} />
      <Corner />
      <GalleryPage apiType={apiType} />
    </div>
  );
}

export default App;
