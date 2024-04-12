import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Upload from "./components/Upload";
import HomePager from "./components/HomePager";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js"
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Shared state to store the fetched data
  const handleSetData = (data) => {
    setData(data);
  };

  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TSE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <Search onHandleSetData={handleSetData} />
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/" element={<HomePager onHandleSetData={handleSetData} data={data} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Upload />} />
        </Routes>
        <div className="container-fluid">
          <div className="row"></div>
          <Outlet />
        </div>
      </main>
    </Router>

    <footer className={import.meta.env.VITE_REACT_ENV === "dev" ? "bg-yellow" : "bg-green"}>
      {/* Footer content */}
      <div><strong>{import.meta.env.VITE_REACT_ENV.toUpperCase()}</strong></div>
    </footer>
    </>
  );
}

export default App;
