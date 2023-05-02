import React, {Component} from 'react';
// import css
import "../css/App.css"
import "../css/index.css"

// import js function
import { GitIcon, LogoTop } from './Header';

// import image file
import search from "../assets/icon/logo.svg"
import arrow from "../assets/icon/normal_right.svg"

// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";

const defautText = "Enter website ...";
const normal_text = ["#282c34", '2px'];
const unselect_text = ["#A6A6A6", '1px'];
const color_submit_bt = ["#FB9B3B","#CA7D31"];

function handleClick2Scroll(e) {
    e.preventDefault();
    var d = document.getElementById("dashboard");
    d.style.marginTop = "10vh";
    var submitButton = document.getElementById("submitButton");
    submitButton.style.marginTop = "10vh";
    const offsetTop = document.querySelector('#dashboard').offsetTop;
    window.scrollTo({
      behavior: 'smooth',
      top: offsetTop
    });
  }
function OnSubmit(){
    const ChangeColor = (i) => {
        var d = document.getElementById("submitButton");
        d.style.backgroundColor = color_submit_bt[i];
        d.style.borderColor = color_submit_bt[i];
    }
    return(
    <section id="submit">
        <img src={arrow} 
            id='submitButton' alt='submitButton'
            className='Submit-Button' href="#submitButton"
            onClick={e=>handleClick2Scroll(e)}
            onPointerLeave={()=>ChangeColor(0)}
            onPointerEnter={()=>ChangeColor(1)}
        />
    </section>
    );
}

export default class Home extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            webLink: defautText,
            scrolldelay: null
        }
    }
    handleChange(){
        var getValue = document.getElementById("input-box");
        getValue.style.color = normal_text[0];
        this.setState({webLink: getValue.value});
    }
    handleOnClick(){
        var getValue = document.getElementById("input-box");
        console.log(getValue.defaultValue);
        if (getValue.value === defautText){
            getValue.value = "";
       }
       this.setState({webLink: getValue.value, clicked:true});
    }
    handleReset(){
        var getValue = document.getElementById("input-box");
        if(this.state.webLink===""){
            getValue.value=defautText;
            getValue.style.color = unselect_text[0];
        }
        getValue.style.borderWidth = unselect_text[1]
    }
    handleOnStay(){
        var getValue = document.getElementById("input-box");
        getValue.style.borderWidth = normal_text[1];
    }
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
                    <input className='Search-Box' 
                    id="input-box"
                    onChange={()=>this.handleChange()}
                    onClick={()=>this.handleOnClick()}
                    defaultValue={defautText}
                    onPointerLeave={()=>this.handleReset()}
                    onPointerEnter={()=>this.handleOnStay()}/>
                    <OnSubmit/>
                    <div id="dashboard" className='Start-lvl'>
                        <div className='Rectangle' style={{height: "55vh"}}/>
                        <div className='Rectangle' style={{height: "40vh"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}