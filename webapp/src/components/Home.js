import React, { Component }  from 'react';
import "../css/App.css"
import "../css/index.css"
import search from "../assets/icon/search.svg"
// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";

function Home() {
    return (
        <div className="Home">
            <h1 className='HomeHeader'>
                <img src={search} className='App-logo'/>
                Web<span>2</span>Sum</h1>
                <body>
                    <input></input>
                </body>
        </div>
    );
  }

  export default Home;