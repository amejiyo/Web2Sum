import re
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# pip install transformers
import warnings

warnings.filterwarnings("ignore")
WHITESPACE_HANDLER = lambda k: re.sub('\s+', ' ', re.sub('\n+', ' ', k.strip()))

article_text = ""
file_path="/Users/amejiyopakapak/Documents/NLP/Project/webapp/data/input_text.txt"     # input text file

with open(file_path, "r", encoding="UTF-8") as file:
    article_text = (" ").join([line.rstrip() for line in file])

model_name = "csebuetnlp/mT5_multilingual_XLSum"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

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

print(summary)
