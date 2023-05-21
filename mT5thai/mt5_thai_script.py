#!/usr/bin/env python
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM, T5ForConditionalGeneration
import pandas as pd
import numpy as np
import html
from IPython.core.display import display, HTML
import tensorflow as tf

# Prevent special characters like & and < to cause the browser to display something other than what you intended.
def html_escape(text):
    return html.escape(text)

# Highlight & export function
def highlightedText(tokens, output, pad='', cut_off=0.5, save_html=False) -> list:
    '''
    https://adataanalyst.com/machine-learning/highlight-text-using-weights/
    '''
    highlighted_text = []
    output_att = tf.stack(output.encoder_attentions)

    reshaped_scores = tf.reduce_mean(output_att[-1,:,0], axis=0)
    df = pd.DataFrame(reshaped_scores).sum(axis=0)
    df = 1/df
    for i, word in enumerate(tokens):
        
        if '▁' in word: word = word.replace('▁', ' ') # change space '▁' to ' '

        # df_sumcol = pd.DataFrame( attention[encoder1][0][encoder2] ).sum(axis=0) # reduce dim(N, N) to dim(N, 1) by sum column
        df /= df.max() # normalize

        weight = df[i]
        if weight < cut_off: weight = 0
        
        highlighted_text.append('<span style="background-color:rgba(251,155,59,' + str(weight) + ');">' + html_escape(word) + '</span>')
        # highlighted_text.append('' + html_escape(word) + '')
        
    highlighted_text = pad.join(highlighted_text)

    display(HTML(highlighted_text))

    if save_html:
        html = HTML(highlighted_text).data
        # file name ex. attention_0_1.html
        with open(f'attention.html', 'w') as f:
            f.write(html)

    return highlighted_text

class Mt5Thai():
    def __init__(self, model_name="thanathorn/mt5-cpe-kmutt-thai-sentence-sum"):
        self.model_name = model_name
        print(self.model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = T5ForConditionalGeneration.from_pretrained(model_name, 
                        output_attentions=True,
                        output_scores=True,
                    )
        self.min_length = 50    # max_length = 2*self.min_lenght
        self.current_output = None
        self.current_input_ids = None
        self.feedback_code = {
            100: "failed to generate output",
            200: "success",
            300: "failed to decode output",
            400: "failed to hightlight input text",
            500: "input summarized length is underexpected",
            600: "inpit summarized length is overexpected "       # (not set yet)
        }

    
    def tokenize(self, inputs):
        self.current_input_ids = self.tokenizer.encode(inputs, return_tensors="pt", padding="longest")
        return self.current_input_ids
    
    def summarize(self):
        ''''
            feedback code:
                100: failed to generate output
                200: success
                300: failed to decode output
                400: failed to hightlighted input text
                500: input summarized length is underexpected
                600: inpit summarized length is overexpected        (not set yet)
        '''
        try:
            self.current_output = self.model.generate(
                            self.current_input_ids, 
                            min_length=self.min_length,     # Parameters that control the length of the output
                            max_length=self.min_length*2, 
                            do_sample=True,                 # Parameters that control the generation strategy used
                            num_beams=3,    
                            output_attentions=True,         # Parameters that define the output variables of `generate`
                            return_dict_in_generate=True,
                        )
        except:
            return 100, self.feedback_code[100], -1
        try:
            output = self.tokenizer.decode(self.current_output.sequences[0], skip_special_tokens=True)
        except:
            return 300, self.feedback_code[300], -1
        tokens = self.tokenizer.convert_ids_to_tokens(self.current_input_ids[0])
        try:
            highlighted_text = highlightedText(tokens, self.current_output)
        except:
            return 400, self.feedback_code[400], -1
        return 200, output, highlighted_text
        
    def get_longer(self):
        self.min_length += 50
        return self.summarize()
    
    def get_shorter(self):
        if self.min_length <= 0:
            return 500 , self.feedback_code[500], -1
        self.min_length -= 50
        return self.summarize()
    
    def reset_min_length(self):
        self.min_length = 50
