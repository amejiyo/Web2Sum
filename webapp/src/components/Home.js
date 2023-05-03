import React, {Component} from 'react';
// import css
import "../css/App.css"
import "../css/index.css"

// import js function
import { GitIcon, LogoTop } from './Header';
import { OnSubmit, OnWebScrpSubmit } from './SubmitButton';
import { InputBox } from './InputBox';
// import image file
import search from "../assets/icon/logo.svg"

// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";

export default class Home extends Component{
    render() {
    return (
        <div className="App">
            <div className='Header'>
                <LogoTop id="logo-header"/>
                <GitIcon/>
            </div>
            <div className='Body'>
                <h1 className='HomeTitle'>
                    <img src={search} className='App-logo' alt='search'/>
                    Web<span>2</span>sum
                </h1>
                <div className='In-Line'>
                    <InputBox/>
                    <OnSubmit/>
                </div>
                    <div id="dashboard" className='Start-lvl'>
                        <div id='webScrap-rec' className='Rectangle' style={{height: "50vh"}}>
                            <textarea className='OutputText' id='webScrap-text' style={{height: "88%"}}/>
                            <OnWebScrpSubmit/>
                        </div>
                        <div id='summarize-rec' className='Rectangle' style={{height: "35vh"}}>
                            <p  id='summarize-text' className='OutputText' style={{height: "80%"}}>
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    )
  }
}