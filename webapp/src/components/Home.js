import React, {Component} from 'react';
import $ from 'jquery';

// import css
import "../css/App.css"
import "../css/index.css"

// import js function
import { GitIcon, LogoTop } from './utils/Header';
import { OnSubmit } from './utils/SubmitButton';
import { OnWebScrpSubmit } from './utils/WebScrapSubmit';
import { InputBox } from './utils/InputBox';
import { CopyButton } from './utils/CopyToClipboard';
import { LikeButton } from './utils/LikeIcon';
import { GetLonger, Getshorter } from './utils/ExtraButton';
import { TextChange } from './utils/SubmitButton';

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
                    Web<span style={{color:"#FB9B3B",WebkitTextStrokeColor: "#FB9B3B"}}>2</span>sum
                </h1>
                <div id='search-line' className='In-Line'>
                    <InputBox/>
                    <OnSubmit/>
                </div>
                    <div id="dashboard" className='Start-lvl'>
                        <div id='webScrap-rec' className='Rectangle' style={{height: "60vh"}}>
                            <p contentEditable className='OutputText' id='webScrap-text' style={{height: "88%", color: "#282B2D"}} onClick={()=>TextChange()}/>
                            <OnWebScrpSubmit/>
                        </div>
                        <div id='summarize-rec' className='Rectangle' style={{height: "35vh"}}>
                            <p  id='summarize-text' className='OutputText' style={{height: "24vh"}}/>
                                <div className='In-Line' style={{justifyContent:"space-between"}}>
                                    <div className='In-Line' id="extra-button" style={{visibility:"hidden"}}>
                                        <Getshorter/>
                                        <GetLonger/>
                                    </div>
                                    <div>
                                        <CopyButton/>
                                        <LikeButton/>
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
        </div>
    )
  }
}