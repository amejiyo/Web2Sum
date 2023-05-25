from IPython.core.display import display, HTML
import pandas as pd
import numpy as np
import html
# import tensorflow as tf
# import torch 

def html_escape(text):
    return html.escape(text)

# Highlight & export function
def html_escape(text):
    return html.escape(text)

# Highlight & export function
def highlightedText(tokens, attention, pad='', max_alpha=0.8, cut_off=0.5, save_html=False) -> list:
    '''
    https://adataanalyst.com/machine-learning/highlight-text-using-weights/
    '''
    is_model_based = False
    highlighted_text = []
    # try:
    #     if isinstance(attention[0], torch.Tensor):
    #         is_model_based = True
    #         output_att = tf.stack(attention.encoder_attentions)
    #         reshaped_scores = tf.reduce_mean(output_att[-1,:,0], axis=0)
    #         df = pd.DataFrame(reshaped_scores).sum(axis=0)
    #         df = 1/df
    #         df /= df.max() # normalize
    # except:
    #         pass

    for i, word in enumerate(tokens):
        word = str(word)
        if '▁' in word: word = word.replace('▁', ' ') # change space '▁' to ' '

        # TF-IDF & TextRank weight is dictionary
        # Attention in tranformer which has Multi-dimension
        if is_model_based:
            # weight = df[i]
            # if weight < cut_off: weight = 0
            pass

        else: # TF-IDF & TextRank weight is dictionary
            if word in attention.keys():
                weight = attention[word] / max(attention.values())*max_alpha # normalize
            else:
                weight = 0.0
        highlighted_text.append('<span style="background-color:rgba(251,155,59,' + str(weight) + ');">' + html_escape(word) + '</span>')
        # highlighted_text.append('' + html_escape(word) + '')
        
    highlighted_text = pad.join(highlighted_text).replace("&lt;/s&gt;", "")

    display(HTML(highlighted_text))

    if save_html:
        html = HTML(highlighted_text).data
        # file name ex. attention_0_1.html
        with open(f'attention.html', 'w') as f:
            f.write(html)

    return highlighted_text

class Base:
    def __init__(self):
        self.min_length = 50    # max_length = 2*self.min_lenght

        self.feedback_code = {
            100: "failed to generate output",
            200: "success",
            300: "failed to decode output",
            400: "failed to hightlight input text",
            500: "input summarized length is underexpected",
            600: "inpit summarized length is overexpected "       # (not set yet)
        }
    def summarize(self):
        return 
        
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