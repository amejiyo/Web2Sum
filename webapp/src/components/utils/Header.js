import React from 'react';

// import image file
import search from "../../assets/icon/logo.svg"
import { setSummaryDisable } from './Summary';
import { setWebScrapDisable } from './WebScrapSubmit';
import { main } from "../Params"

export function GitIcon(){
    const ChangeIcon = (i) =>{
        var d = document.getElementById("gitLogo");
        var text = document.getElementById("gitText");
        text.style.color = main.git_icon[i][1];
        text.style.webkitTextStrokeColor = main.git_icon[i][1];
        d.src = main.git_icon[i][0];
    }
    var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
    return(
    <header className='Top-Right' id="gitText"
        onClick={()=>{window.open("https://github.com/amejiyo/WebSum", "_blank", strWindowFeatures)}}
        onPointerEnter={()=>ChangeIcon(1)}
        onPointerLeave={()=>ChangeIcon(0)}
        > <p>Visit us</p>
        <img src={main.git_icon[0][0]} className='Git-logo' alt="gitLogo" id="gitLogo"/>
    </header>
    );
}

function resetToDefault(){
    var input_box = document.getElementById("input-box");
    var submit_button = document.getElementById("submitButton");
    submit_button.style.backgroundColor = main.color_disable[1];
    submit_button.style.borderColor = main.color_disable[1];
    input_box.style.borderColor = main.color_disable[1];
    main.color_submit_bt = main.color_enable_bt;
    document.getElementById("summarize-text").innerHTML = "";
    document.getElementById("webScrap-text").value = "";
    setSummaryDisable();
    setWebScrapDisable();
}
export function LogoTop(){
    const handleOnClick = (e) =>{
        e.preventDefault();
        var d = document.getElementById("dashboard");
        d.style.marginTop = "25vh";
        var submitButton = document.getElementById("search-line");
        submitButton.style.marginTop = "0vh";
        const offsetTop = document.querySelector('#dashboard').offsetTop;
        window.scrollTo({
          behavior: 'smooth',
          top: 0
        });
        resetToDefault();
    }
    return (
        <header className='Top-Left' id="logo-top"
        onClick={e=>{handleOnClick(e)}}>
        <img src={search} className='App-logo' id="text-top" alt='search'/>
        Web<span id="2-top">2</span>sum
    </header>
    );
}