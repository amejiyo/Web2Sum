import React, {Component} from 'react';
import { useNavigate } from "react-router-dom";
import "../css/App.css"
import "../css/index.css"
import search from "../assets/icon/logo.svg"
import arrow from "../assets/icon/normal_right.svg"
import gitHub_dark from "../assets/icon/grey_github.svg"
import gitHub from "../assets/icon/normal_github.svg"

// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";

const defautText = "Enter website ...";
const normal_text = ["#282c34", '3px'];
const unselect_text = ["#999999", '2px'];
const color_submit_bt = ["#FB9B3B","#CA7D31"];
const git_icon = [[gitHub, "#E8E8E8"], [gitHub_dark, "#777777"]]

function OnSubmit(){
    const navigate = useNavigate();
    const ChangeColor = (i) => {
        var d = document.getElementById("submitButton");
        d.style.backgroundColor = color_submit_bt[i];
        d.style.borderColor = color_submit_bt[i];
    }
    return(
    <img src={arrow} 
        id='submitButton' alt='submitButton'
        className='Submit-Button' 
        onClick={()=>navigate("/Dashboard")}
        onPointerLeave={()=>ChangeColor(0)}
        onPointerEnter={()=>ChangeColor(1)}
    />
    );
}

function GitIcon(){
    const ChangeIcon = (i) =>{
        var d = document.getElementById("gitLogo");
        var text = document.getElementById("gitText");
        text.style.color = git_icon[i][1];
        text.style.webkitTextStrokeColor = git_icon[i][1];
        d.src = git_icon[i][0];
    }
    return(
    <div className='Top-Right' id="gitText"
        onClick={()=>{window.location.href = "https://github.com/amejiyo/WebSum"}}
        onPointerEnter={()=>ChangeIcon(1)}
        onPointerLeave={()=>ChangeIcon(0)}
        > <p>Visit us</p>
        <img src={gitHub} className='Git-logo' alt="gitLogo" id="gitLogo"/>
    </div>
    );
}
export default class Home extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            webLink:defautText,
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
            <GitIcon/>
            <h1 className='HomeHeader'>
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
                <div className='Rectangle' style={{left: "8vw"}}/>
                <div className='Rectangle' style={{right: "8vw"}}/>
            </div>
        </div>
    )
  }
}