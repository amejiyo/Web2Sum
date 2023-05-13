import React from 'react';
import { main } from '../Params';
import { editSummary } from '../utils/RunPython';
import { setSummaryEnable } from './SubmitButton';
import right_symbol from '../../assets/icon/yellow_right.svg';

async function handleEditSummarize(input) {
    var web_scrap = document.getElementById("webScrap-text");
    var summarize_text = document.getElementById("summarize-text");
    var output = await editSummary(input);
    console.log(output);
    if (output.flag === "1"){
        summarize_text.innerHTML = output.result;
        web_scrap.innerHTML = output.input_text;
        setSummaryEnable();
    }
    else if (output.flag === "0"){
        summarize_text.innerHTML = output.result;
    }
  }

const ChangeIcon = (i, id) =>{
    var d = document.getElementById(id);
    d.style.backgroundColor = main.extra_bt[i];
    d.style.borderColor = main.extra_bt[i];
}

export function GetLonger(){
    return(
        <div className='ExtraButton' id='get-longer' style={{paddingLeft: "1vmin"}}
        onClick={()=>handleEditSummarize('longer')}
        onPointerEnter={()=>ChangeIcon(1, "get-longer")}
        onPointerLeave={()=>ChangeIcon(0, "get-longer")}>
            get longer 
            <img src={right_symbol} className='Right-Icon'/>
        </div>
    );
}

export function Getshorter(){
    return(
        <div className='ExtraButton' id='get-shorter' style={{paddingRight: "1vmin"}}
        onClick={()=>handleEditSummarize('shorter')}
        onPointerEnter={()=>ChangeIcon(1, "get-shorter")}
        onPointerLeave={()=>ChangeIcon(0, "get-shorter")}>
            <img src={right_symbol} className='Left-Icon'/>
            get shorter 
        </div>
    );
}