#!/usr/bin/env python
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM, T5ForConditionalGeneration
from ..utils import highlightedText, Base

class Mt5Thai(Base):
    def __init__(self, model_name="thanathorn/mt5-cpe-kmutt-thai-sentence-sum"):
        super().__init__()
        self.model_name = model_name
        print(self.model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = T5ForConditionalGeneration.from_pretrained(model_name, 
                        output_attentions=True,
                        output_scores=True,
                    )
        self.current_output = None
        self.current_input_ids = None

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
