import React from 'react';
import { getData, getSummary } from './RunPython';
import { main } from './Params';
import arrow from "../assets/icon/normal_right.svg"

async function handleClick2Scroll(e) {
    setToDisable();
    e.preventDefault();
    var d = document.getElementById("dashboard");
    d.style.marginTop = "8vh";
    var submitButton = document.getElementById("submitButton");
    submitButton.style.marginTop = "20vh";
    const offsetTop = document.querySelector('#dashboard').offsetTop;
    window.scrollTo({
      behavior: 'smooth',
      top: offsetTop
    });
    var input = document.getElementById("input-box").value;
    var webScrap_text = document.getElementById("webScrap-text");
    var webScrap_rec = document.getElementById("webScrap-rec");
    var webScrap_sub = document.getElementById("webScrap-sub");
    var summarize_text = document.getElementById("summarize-text");
    summarize_text.innerHTML = "Summarization";
    if (input === main.defautText){
        webScrap_text.value = "Enter paragrah ...";
    }
    else{
        webScrap_text.value = "Enter paragrah ...";
        var output = await getData(input);
        webScrap_text.value = output;
        webScrap_rec.style.borderColor = main.color_enable_bt[0];
        webScrap_rec.style.backgroundColor = "white";
        webScrap_sub.style.visibility = "visible";
    }
  }

function setToDisable(){
    var input_box = document.getElementById("input-box");
    input_box.style.borderColor = main.color_disable[0];
    main.color_submit_bt = main.color_disable_bt;
}

async function handleSummarize() {
    var input = document.getElementById("webScrap-text").value;
    var summarize_text = document.getElementById("summarize-text");
    var output = await getSummary(input);
    summarize_text.innerHTML = output;
  }

export function OnSubmit(){
    const ChangeColor = (i) => {
        var d = document.getElementById("submitButton");
        d.style.backgroundColor = main.color_submit_bt[i];
        d.style.borderColor = main.color_submit_bt[i];
    }
    return(
        <img src={arrow} 
            id='submitButton' alt='submitButton'
            className='Submit-Button' href="#submitButton"
            onClick={e=>handleClick2Scroll(e)}
            onPointerLeave={()=>ChangeColor(0)}
            onPointerEnter={()=>ChangeColor(1)}
        />
    );
}

export function OnWebScrpSubmit(){
    const ChangeColor = (i) => {
        var d = document.getElementById("submitButton");
        d.style.backgroundColor = main.color_submit_bt[i];
        d.style.borderColor = main.color_submit_bt[i];
    }
    return(
        <img src={arrow} 
            id='webScrap-sub' alt='webScrap-sub'
            className='Submit-Button'
            style={{visibility:"hidden", position: "absolute", bottom:"17vh", left:"46vw"}}
            onClick={()=>handleSummarize()}
            onPointerLeave={()=>ChangeColor(0)}
            onPointerEnter={()=>ChangeColor(1)}
        />
    );
}