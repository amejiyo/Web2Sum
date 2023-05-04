import React from 'react';
import { main } from '../Params';

export function LikeButton(){
    const ChangeIcon = (i) =>{
        var d = document.getElementById("like-icon");
        d.src = main.like_icon[i][0];
        d.style.backgroundColor = main.like_icon[i][1];
        d.style.borderColor = main.like_icon[i][1];
    }
    return (
        <img src={main.like_icon[0][0]} id="like-icon"
        className='Like-Icon' alt="like-icon"
        onPointerEnter={()=>ChangeIcon(1)}
        onPointerLeave={()=>ChangeIcon(0)}
        />
    );
}
