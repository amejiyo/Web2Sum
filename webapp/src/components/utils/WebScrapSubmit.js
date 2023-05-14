import React from 'react';
import { main } from '../Params';
import arrow from "../../assets/icon/normal_right.svg"
import { handleSummarize } from './Summary';

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