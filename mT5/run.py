import re
import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, BertGenerationEncoder, BertGenerationDecoder, EncoderDecoderModel, BertTokenizer
# pip install transformers
import warnings
warnings.filterwarnings("ignore")

WHITESPACE_HANDLER = lambda k: re.sub('\s+', ' ', re.sub('\n+', ' ', k.strip()))

article_text = ""
file_path="/Users/amejiyopakapak/Documents/NLP/Web2TextSum/webapp/data"     # input text file

with open(os.path.join(file_path, "input_text.txt"), "r", encoding="UTF-8") as file:
    article_text = (" ").join([line.rstrip() for line in file])

model_name = "csebuetnlp/mT5_multilingual_XLSum"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

encoder = BertGenerationEncoder.from_pretrained("bert-large-uncased", bos_token_id=101, eos_token_id=102)
decoder = BertGenerationDecoder.from_pretrained("bert-large-uncased", add_cross_attention=True, is_decoder=True, bos_token_id=101, eos_token_id=102)

sentence_fuser = EncoderDecoderModel.from_pretrained("google/roberta2roberta_L-24_discofuse")


input_ids = tokenizer(
    [WHITESPACE_HANDLER(article_text)],
    return_tensors="pt",
    padding="max_length",
    truncation=True,
    max_length=512
)["input_ids"]

output_ids = model.generate(
    input_ids=input_ids,
    max_length=10000,
    no_repeat_ngram_size=2,
    num_beams=4
)[0]

summary = tokenizer.decode(
    output_ids,
    skip_special_tokens=True,
    clean_up_tokenization_spaces=False
)

input_ids = tokenizer(article_text, add_special_tokens=False, return_tensors="pt").input_ids
outputs = sentence_fuser.generate(input_ids)
print(tokenizer.decode(outputs[0]))
with open(os.path.join(file_path, "output_text.txt"), "w", encoding="UTF-8") as file:
    file.write(summary)
file.close()