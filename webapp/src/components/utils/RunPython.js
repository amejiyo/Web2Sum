import { nanoid } from 'nanoid'
import { main } from '../Params';
import { setSummaryDisable } from "./Summary"

var id = nanoid() ;
// var web = "http://amejiyo.trueddns.com:36811"
var web = "https://5172-2001-fb1-d6-abea-b188-cb68-2257-cc3.ngrok-free.app"
// var web = "localhost:8989"
export async function getData(input) {
    var webScrap_text = document.getElementById("webScrap-text");
    webScrap_text.innerText = "Insert text ...";
    webScrap_text.style.color = main.unselect_text[0];
    id = nanoid() ;
    const url = `${web}/home/webscrap/${id}`;
    const req = await fetch(url,{
        method:"POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
          },
        body: new URLSearchParams({
            'input':input,
        })
    });
    // console.log(req)
    const response = await fetch(url,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          }
    }).then(function(response){
        return response.json();
    }).then(function(text){
        return JSON.parse(JSON.stringify(text)).result;
    });
    return response;
}

export async function getSummary(input) {
    var summarize_text = document.getElementById("summarize-text");
    summarize_text.innerText = "Model is loading ...";
    const url = `${web}/home/summarize/${id}`;
    const req = await fetch(url,{
        method:"POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
          },
        body: new URLSearchParams({
            'input':input,
            'model': main.defaultModel
        })
    });
    // console.log(req)
    const response = await fetch(url,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          }
    }).then(function(response){
        return response.json();
    }).then(function(text){
        return JSON.parse(JSON.stringify(text));
    });
    return response;
}

export async function editSummary(input) {
    var summarize_text = document.getElementById("summarize-text");
    summarize_text.innerHTML = "Model is loading ...";
    setSummaryDisable()
    const url = `${web}/home/summarize_edit/${id}`;
    const req = await fetch(url,{
        method:"POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
          },
        body: new URLSearchParams({
            'input':input,
            'model': main.defaultModel
        })
    });
    // console.log(req)
    const response = await fetch(url,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          }
    }).then(function(response){
        return response.json();
    }).then(function(text){
        return JSON.parse(JSON.stringify(text));
    });
    return response;
}