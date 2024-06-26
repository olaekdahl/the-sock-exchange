import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import About from "./components/About";
import Add from "./components/Add";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Shared state to store the fetched data
  const handleSetData = (data) => {
    setData(data);
  };

  return (
    <>
      <Router>
        <Navbar onHandleSetData={handleSetData} />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home onHandleSetData={handleSetData} data={data} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Add />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;