import React from 'react';

// import image file
import gitHub_dark from "../assets/icon/grey_github.svg"
import gitHub from "../assets/icon/normal_github.svg"
import search from "../assets/icon/logo.svg"

const git_icon = [[gitHub, "#E8E8E8"], [gitHub_dark, "#777777"]]


export function GitIcon(){
    const ChangeIcon = (i) =>{
        var d = document.getElementById("gitLogo");
        var text = document.getElementById("gitText");
        text.style.color = git_icon[i][1];
        text.style.webkitTextStrokeColor = git_icon[i][1];
        d.src = git_icon[i][0];
    }
    return(
    <header className='Top-Right' id="gitText"
        onClick={()=>{window.location.href = "https://github.com/amejiyo/WebSum"}}
        onPointerEnter={()=>ChangeIcon(1)}
        onPointerLeave={()=>ChangeIcon(0)}
        > <p>Visit us</p>
        <img src={gitHub} className='Git-logo' alt="gitLogo" id="gitLogo"/>
    </header>
    );
}

export function LogoTop(){
    const handleOnClick = (e) =>{
        e.preventDefault();
        var d = document.getElementById("dashboard");
        d.style.marginTop = "25vh";
        var submitButton = document.getElementById("submitButton");
        submitButton.style.marginTop = "0vh";
        const offsetTop = document.querySelector('#dashboard').offsetTop;
        window.scrollTo({
          behavior: 'smooth',
          top: 0
        });
    }
    return (
        <header className='Top-Left' id="logo-top"
        onClick={e=>{handleOnClick(e)}}>
        <img src={search} className='App-logo' id="text-top" alt='search'/>
        Web<span id="2-top">2</span>sum
    </header>
    );
}