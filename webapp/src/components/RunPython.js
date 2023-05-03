import { nanoid } from 'nanoid'

export async function getData(input) {
    const id = nanoid() ;
    const url = `http://localhost:8989/home/webscrap/${id}`;
    const req = await fetch(url,{
        method:"POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
          },
        body: new URLSearchParams({
            'input':input
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
    const id = nanoid() ;
    const url = `http://localhost:8989/home/summarize/${id}`;
    const req = await fetch(url,{
        method:"POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
          },
        body: new URLSearchParams({
            'input':input
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