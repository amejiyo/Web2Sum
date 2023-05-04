import React from 'react';
import { main } from '../Params';
import { editSummary } from '../utils/RunPython';
import right_symbol from '../../assets/icon/yellow_right.svg';

const ChangeIcon = (i, id) =>{
    var d = document.getElementById(id);
    d.style.backgroundColor = main.extra_bt[i];
    d.style.borderColor = main.extra_bt[i];
}

export function GetLonger(){
    return(
        <div className='ExtraButton' id='get-longer' style={{paddingLeft: "1vmin"}}
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
        onPointerEnter={()=>ChangeIcon(1, "get-shorter")}
        onPointerLeave={()=>ChangeIcon(0, "get-shorter")}>
            <img src={right_symbol} className='Left-Icon'/>
            get shorter 
        </div>
    );
}