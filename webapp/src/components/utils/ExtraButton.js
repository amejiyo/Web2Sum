import React from 'react';
import { main } from '../Params';
import { editSummary } from '../utils/RunPython';
import { setSummaryEnable } from './Summary';
import right_symbol from '../../assets/icon/yellow_right.svg';

const model_list = ["mT5", "TextRank", "TFIDF"];
async function handleEditSummarize(input) {
    var web_scrap = document.getElementById("webScrap-text");
    var summarize_text = document.getElementById("summarize-text");
    var output = await editSummary(input);
    console.log(output);
    if (output.flag === "1"){
        summarize_text.innerHTML = output.result;
        web_scrap.innerHTML = output.input_text;
        autoResizeSummaryBox();
        setSummaryEnable();
        if (output.length <= 50) document.getElementById("get-shorter").style.visibility = "hidden";
        else document.getElementById("get-shorter").style.visibility = "visible";
    }
    else if (output.flag === "0"){
        summarize_text.innerHTML = output.result;
    }
  }

const ColorTriggerExt = (i, id) =>{
    var d = document.getElementById(id);
    d.style.backgroundColor = main.extra_bt[i];
    d.style.borderColor = main.extra_bt[i];
}

const ColorTriggerModel = (i, id) =>{
    var d = document.getElementById(id);
    if (main.defaultModel === id) d.style.backgroundColor = main.model_enable_bt[i];
    else d.style.backgroundColor = main.model_disable_bt[i];
}

function autoResizeSummaryBox() {
    var summarize_text = document.getElementById("summarize-text");
    var summarize_rec = document.getElementById("summarize-rec");
    if (summarize_text.clientHeight < summarize_text.scrollHeight){
        let height_diff = summarize_text.scrollHeight - summarize_text.clientHeight
        console.log(summarize_rec.clientHeight + height_diff, 0.6 * window.innerHeight);
        if (summarize_rec.clientHeight + height_diff < 0.6 * window.innerHeight){
            summarize_rec.setAttribute("style","height: "+ (summarize_rec.clientHeight + height_diff)*100/window.innerHeight + "vh");
            summarize_text.setAttribute("style","height: "+ (summarize_text.clientHeight + height_diff)*100/window.innerHeight + "vh");
        }
        else {
            summarize_rec.setAttribute("style","height: 60vh");
            summarize_text.setAttribute("style","height: 49vh");
        }
        if (summarize_rec.clientHeight < 0.24 * window.innerHeight){
            summarize_rec.setAttribute("style","height: 35vh");
            summarize_text.setAttribute("style","height: 24vh");
        }
    }
}

export function setExtraIcontoDefault(){
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

export function GetLonger(){
    return(
        <div className='ExtraButton' id='get-longer' style={{paddingLeft: "1vmin"}}
        onClick={()=>handleEditSummarize('longer')}
        onPointerEnter={()=>ColorTriggerExt(1, "get-longer")}
        onPointerLeave={()=>ColorTriggerExt(0, "get-longer")}>
            get longer 
            <img src={right_symbol} className='Right-Icon'/>
        </div>
    );
}

export function Getshorter(){
    return(
        <div className='ExtraButton' id='get-shorter' style={{paddingRight: "1vmin"}}
        onClick={()=>handleEditSummarize('shorter')}
        onPointerEnter={()=>ColorTriggerExt(1, "get-shorter")}
        onPointerLeave={()=>ColorTriggerExt(0, "get-shorter")}>
            <img src={right_symbol} className='Left-Icon'/>
            get shorter 
        </div>
    );
}

function handleModelSelect (name){
    main.defaultModel = name;
    for (var i =0; i < model_list.length; i++){
        var a = model_list[i]
        if (main.defaultModel === a) document.getElementById(a).style.backgroundColor = main.model_enable_bt[0];
        else document.getElementById(a).style.backgroundColor = main.model_disable_bt[0];
    }
}

export function SelectmT5(){
    return(
        <div className='ModelButton' id='mT5' style={{backgroundColor: "#FFEFDF"}}
        onClick={()=>handleModelSelect('mT5')}
        onPointerEnter={()=>ColorTriggerModel(1, "mT5")}
        onPointerLeave={()=>ColorTriggerModel(0, "mT5")}>
            mT5
        </div>
    );
}

export function SelectTextRank(){
    return(
        <div className='ModelButton' id='TextRank' 
        onClick={()=>handleModelSelect('TextRank')}
        onPointerEnter={()=>ColorTriggerModel(1, "TextRank")}
        onPointerLeave={()=>ColorTriggerModel(0, "TextRank")}>
            TextRank
        </div>
    );
}

export function SelectTFIDF(){
    return(
        <div className='ModelButton' id='TFIDF' 
        onClick={()=>handleModelSelect('TFIDF')}
        onPointerEnter={()=>ColorTriggerModel(1, "TFIDF")}
        onPointerLeave={()=>ColorTriggerModel(0, "TFIDF")}>
            TFIDF
        </div>
    );
}