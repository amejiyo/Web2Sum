import React from 'react';
import "../css/App.css"
import "../css/index.css"
// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";

function PageNotFound() {
    return (
        <div className="App">
            <h1>
                ERROR: PageNotFound
            </h1>
            <p>
                click &nbsp;
                <a className="App-link" href="/" rel="noopener noreferrer">
                Home</a>
                &nbsp; to return Home Page
            </p>
        </div>
    );
  }
  

  export default PageNotFound;