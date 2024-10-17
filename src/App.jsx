import React from "react";
import Home from "./pages/Home";
import Create from "./pages/Create";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;
