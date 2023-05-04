import React  from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';

window.React1 = require('react');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();