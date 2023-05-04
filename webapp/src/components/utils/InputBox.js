import React, {useState} from "react";
import { main } from '../Params';

var webLink = main.defautText;

function handleChange(){
    var getValue = document.getElementById("input-box");
    getValue.style.color = main.normal_text[0];
    webLink = getValue.value;
}
function handleOnClick(){
    var getValue = document.getElementById("input-box");
    console.log(getValue.defaultValue);
    if (getValue.value === main.defautText){
        getValue.value = "";
   }
   webLink = getValue.value;
   var input_box = document.getElementById("input-box");
   var submit_button = document.getElementById("submitButton");
   submit_button.style.backgroundColor = main.color_disable[1];
   submit_button.style.borderColor = main.color_disable[1];
   input_box.style.borderColor = main.color_disable[1];
   main.color_submit_bt = main.color_enable_bt;
}
function handleReset(){
    var getValue = document.getElementById("input-box");
    if( webLink===""){
        getValue.value=main.defautText;
        getValue.style.color = main.unselect_text[0];
    }
    getValue.style.borderWidth = main.unselect_text[1]
}
function handleOnStay(){
    var getValue = document.getElementById("input-box");
    getValue.style.borderWidth = main.normal_text[1];
}

export function InputBox(){
    return(                    
        <input className='Search-Box' 
        id="input-box"
        onChange={()=>handleChange()}
        onClick={()=>handleOnClick()}
        defaultValue={main.defautText}
        onPointerLeave={()=>handleReset()}
        onPointerEnter={()=>handleOnStay()}/>);
}