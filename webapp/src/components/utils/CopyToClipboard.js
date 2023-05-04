import React from 'react';
import { main } from "../Params"

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }

function copyTextToClipboard() {
  if (main.copy_icon === main.color_enable_bt){
    var text = document.getElementById("summarize-text").innerHTML;
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}

export function CopyButton(){
    const ChangeIcon = (i) =>{
        var d = document.getElementById("copy-icon");
        d.src = main.copy_icon[i][0];
        d.style.backgroundColor = main.copy_icon[i][1];
        d.style.borderColor = main.copy_icon[i][1];
    }
    return (
        <img src={main.copy_icon[0][0]} id="copy-icon"
        className='Copy-Icon' alt="copy-icon"
        onClick={()=>copyTextToClipboard()}
        onPointerEnter={()=>ChangeIcon(1)}
        onPointerLeave={()=>ChangeIcon(0)}
        />
    );
}

