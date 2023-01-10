import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { APIS } from "../static/constants";

import GalleryPage from "../pages/GalleryPage";
import NotFound from "../pages/NotFound";

const DEFAULT_PAGE = "/giphy";

const Router = ({ inputValue, setInputValue }) => {
  return (
    <Routes>
      {APIS.map(({ apiType }) => (
        <Route
          key={apiType}
          path={`/${apiType}`}
          element={
            <GalleryPage
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          }
        />
      ))}
      <Route path="/" element={<Navigate to={DEFAULT_PAGE} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
