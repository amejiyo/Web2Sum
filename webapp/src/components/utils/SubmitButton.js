import React from 'react';
import { getData, getSummary } from './RunPython';
import { main } from '../Params';
import arrow from "../../assets/icon/normal_right.svg"

var offset = 0;
async function handleClick2Scroll(e) {
    setToDisable();
    e.preventDefault();
    var d = document.getElementById("dashboard");
    document.body.style.overflow = "scroll";
    d.style.marginTop = "8vh";
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
    }
    else{
        webScrap_text.innerText = "Enter paragrah ...";
        var output = await getData(input);
        webScrap_text.innerText = output;
        webScrap_rec.style.borderColor = main.color_enable_bt[0];
        webScrap_rec.style.backgroundColor = "white";
        webScrap_sub.style.visibility = "visible";
        setSummaryDisable();
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
}

export function setWebScrapDisable(){
    var webScrap_text = document.getElementById("webScrap-text");
    var webScrap_rec = document.getElementById("webScrap-rec");
    var webScrap_sub = document.getElementById("webScrap-sub");
    webScrap_text.value = "";
    webScrap_rec.style.borderColor = main.sum_box[0][0];
    webScrap_rec.style.backgroundColor = main.sum_box[0][0];
    webScrap_sub.style.visibility = "hidden";
    var d = document.getElementById("webScrap-sub");
    main.sum_bt = ["#f7f7f7", "#f7f7f7"];
    d.style.backgroundColor = main.sum_bt[0];
    d.style.borderColor = main.sum_bt[0];
}

function setExtraIcontoDefault(){
    var copy_icon = document.getElementById("copy-icon");
    var like_icon = document.getElementById("like-icon");
    var d = document.getElementById("webScrap-sub");
    copy_icon.src = main.copy_icon[0][0];
    like_icon.src = main.like_icon[0][0];
    copy_icon.style.backgroundColor = main.like_icon[0][1];
    copy_icon.style.borderColor = main.like_icon[0][1];
    like_icon.style.backgroundColor = main.like_icon[0][1];
    like_icon.style.borderColor = main.like_icon[0][1];
}

export function setSummaryEnable(){
    main.copy_icon = main.copy_enable_bt;
    main.like_icon = main.like_enable_bt;
    var summarize_rec = document.getElementById("summarize-rec");
    var summarize_text = document.getElementById("summarize-text");
    summarize_rec.style.backgroundColor = main.sum_box[1][0];
    summarize_text.style.color = main.sum_box[1][1];
    setExtraIcontoDefault();
    var extra_button = document.getElementById("extra-button");
    extra_button.style.visibility = "visible";
}

export function setSummaryDisable(){
    main.copy_icon = main.copy_disable_bt;
    main.like_icon = main.like_disable_bt;
    var summarize_rec = document.getElementById("summarize-rec");
    var summarize_text = document.getElementById("summarize-text");
    summarize_rec.style.backgroundColor = main.sum_box[0][0];
    summarize_text.style.color = main.sum_box[0][1];
    setExtraIcontoDefault();
    var extra_button = document.getElementById("extra-button");
    extra_button.style.visibility = "hidden";
    var d = document.getElementById("webScrap-sub");
    main.sum_bt = main.color_enable_bt;
    d.style.backgroundColor = main.sum_bt[0];
    d.style.borderColor = main.sum_bt[0];
}

async function handleSummarize() {
    var input = document.getElementById("webScrap-text");
    var summarize_text = document.getElementById("summarize-text");
    var output = await getSummary(input.innerText);
    console.log(output);
    if (output.flag === "1"){
        summarize_text.innerHTML = output.result;
        input.innerHTML = output.input_text;
        setSummaryEnable();
    }
    else if (output.flag === "0"){
        summarize_text.innerHTML = output.result;
    }
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

export function OnWebScrpSubmit(){
    const ChangeColor = (i) => {
        var d = document.getElementById("webScrap-sub");
        d.style.backgroundColor = main.sum_bt[i];
        d.style.borderColor = main.sum_bt[i];
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