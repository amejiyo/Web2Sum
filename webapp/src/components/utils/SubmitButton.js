import React from 'react';
import { getData, getSummary } from './RunPython';
import { main } from '../Params';
import arrow from "../../assets/icon/normal_right.svg"
import { setSummaryDisable } from './Summary';

var offset = 0;
async function handleClick2Scroll(e) {
    setToDisable();
    e.preventDefault();
    var d = document.getElementById("dashboard");
    document.body.style.overflow = "scroll";
    d.style.marginTop = "5vh";
    var submitButton = document.getElementById("search-line");
    var offsetTop = submitButton.getBoundingClientRect().top + window.innerWidth*0.06;
    if (offset < offsetTop){
        offset = offsetTop;
    }
    window.scrollTo({
      behavior: 'smooth',
      top: offset,
    });
    SentLink();
  }

async function SentLink(){
    var input = document.getElementById("input-box").value;
    var webScrap_text = document.getElementById("webScrap-text");
    var webScrap_rec = document.getElementById("webScrap-rec");
    var webScrap_sub = document.getElementById("webScrap-sub");
    var summarize_text = document.getElementById("summarize-text");
    summarize_text.innerHTML = "Summarization";
    if (input === main.defautText){
        webScrap_text.innerText = "Enter paragrah ...";
        webScrap_text.style.color = main.unselect_text[0];
    }
    else{
        webScrap_text.innerText = "Enter paragrah ...";
        var output = await getData(input);
        webScrap_text.innerText = output;
        webScrap_rec.style.borderColor = main.color_enable_bt[0];
        webScrap_rec.style.backgroundColor = "white";
        webScrap_sub.style.visibility = "visible";
        setSummaryDisable();
        document.getElementById("select-model").style.visibility = "visible";
    }
}

export function setToDisable(){
    var input_box = document.getElementById("input-box");
    input_box.style.borderColor = main.color_disable[0];
    main.color_submit_bt = main.color_disable_bt;
    var submitButton = document.getElementById("submitButton");
    main.color_submit_bt = main.color_disable_bt;
    submitButton.style.backgroundColor = main.color_submit_bt[0];
    submitButton.style.borderColor = main.color_submit_bt[0];
    document.getElementById("summarize-rec").setAttribute("style","height: 35vh");
    document.getElementById("summarize-text").setAttribute("style","height: 24vh");
    document.getElementById("get-shorter").style.visibility = "hidden";
}

export function OnSubmit(){
    const ChangeColor = (i) => {
        var d = document.getElementById("submitButton");
        d.style.backgroundColor = main.color_submit_bt[i];
        d.style.borderColor = main.color_submit_bt[i];
        var input_box = document.getElementById("input-box");
        input_box.style.borderColor = main.color_submit_bt[i];
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

export const TextChange = () => {
    document.getElementById("select-model").style.visibility = "visible";
    var webScrap_rec = document.getElementById("webScrap-rec");
    var webScrap_sub = document.getElementById("webScrap-sub");
    webScrap_rec.style.borderColor = main.color_enable_bt[0];
    webScrap_rec.style.backgroundColor = "white";
    webScrap_sub.style.visibility = "visible";
    setSummaryDisable();
}

