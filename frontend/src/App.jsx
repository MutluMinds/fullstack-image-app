import React, { useState } from "react";
import {
  IMAGE_TYPE_GIFS,
} from "./static/constants";

import Navbar from "./components/Navbar/Navbar";
import Corner from "./components/Corner/Corner";
import GalleryPage from "./pages/GalleryPage";

function App() {
  const [imageType, setImageType] = useState(IMAGE_TYPE_GIFS);

  return (
    <div className="App">
      <Navbar onChange={(value) => setImageType(value)} value={imageType} />
      <Corner />
      <GalleryPage imageType={imageType} />
    </div>
  );
}

export default App;
