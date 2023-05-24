import { getSummary } from './RunPython';
import { setExtraIcontoDefault } from './ExtraButton';
import { main } from "../Params"

export async function handleSummarize() {
    setSummaryDisable()
    var input = document.getElementById("webScrap-text");
    var summarize_text = document.getElementById("summarize-text");
    var output = await getSummary(input.innerText);
    console.log(output);
    if (output.flag === "1"){
        summarize_text.innerHTML = output.result;
        input.innerHTML = output.input_text;
        setSummaryEnable();
        document.getElementById("get-shorter").style.visibility = "hidden";
    }
    else if (output.flag === "0"){
        summarize_text.innerHTML = output.result;
        summarize_text.style.color = "red";
    }
  }

export function setSummaryEnable(){
    main.copy_icon = main.copy_enable_bt;
    main.like_icon = main.like_enable_bt;
    var summarize_rec = document.getElementById("summarize-rec");
    var summarize_text = document.getElementById("summarize-text");
    summarize_rec.style.backgroundColor = main.sum_box[1][0];
    summarize_text.style.color = main.sum_box[1][1];
    setExtraIcontoDefault();
    var extra_button = document.getElementById("extra-button");
    extra_button.style.visibility = "visible";
}

export function setSummaryDisable(){
    main.copy_icon = main.copy_disable_bt;
    main.like_icon = main.like_disable_bt;
    var summarize_rec = document.getElementById("summarize-rec");
    var summarize_text = document.getElementById("summarize-text");
    summarize_rec.style.backgroundColor = main.sum_box[0][0];
    summarize_text.style.color = main.sum_box[0][1];
    setExtraIcontoDefault();
    var extra_button = document.getElementById("extra-button");
    extra_button.style.visibility = "hidden";
    var d = document.getElementById("webScrap-sub");
    main.sum_bt = main.color_enable_bt;
    d.style.backgroundColor = main.sum_bt[0];
    d.style.borderColor = main.sum_bt[0];
    document.getElementById("summarize-rec").setAttribute("style","height: 35vh");
    document.getElementById("summarize-text").setAttribute("style","height: 24vh");
    document.getElementById("get-shorter").style.visibility = "hidden";
}