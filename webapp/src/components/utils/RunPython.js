import { nanoid } from 'nanoid'
import { main } from '../Params';

var id = nanoid() ;
export async function getData(input) {
    var webScrap_text = document.getElementById("webScrap-text");
    webScrap_text.innerText = "Insert text ...";
    webScrap_text.style.color = main.unselect_text[0];
    id = nanoid() ;
    const url = `http://localhost:8989/home/webscrap/${id}`;
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
    const url = `http://localhost:8989/home/summarize/${id}`;
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
    const url = `http://localhost:8989/home/summarize_edit/${id}`;
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