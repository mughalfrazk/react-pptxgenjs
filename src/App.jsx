import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Editor from "./app/Editor";
import Exmaple01 from "./app/Example01";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="editor" element={<Editor />} />
        <Route path="ex-01" element={<Exmaple01 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
