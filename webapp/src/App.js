import React, { Component }  from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import Home from "./components/Home";
// import Dashboard from "./components/Dashboard/Dashboard";
// import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
  }

  export default App;