from flask import Flask, jsonify, request
from flask_cors import CORS

# webScraptor
from bs4 import BeautifulSoup
import requests

#mT5
import re
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, BertGenerationEncoder, BertGenerationDecoder, EncoderDecoderModel, BertTokenizer
import warnings
warnings.filterwarnings("ignore")

model_name = "csebuetnlp/mT5_multilingual_XLSum"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# for create python app only 
def webScrap(URL):
    # Fetch the page and create a Beautiful Soup object
    page = requests.get(URL)
    soup = BeautifulSoup(page.text)
    return soup.get_text()

def summarize(text):
    WHITESPACE_HANDLER = lambda k: re.sub('\s+', ' ', re.sub('\n+', ' ', k.strip()))
    input_ids = tokenizer(
        [WHITESPACE_HANDLER(text)],
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
    # edit here
    return summary


# create route for python app server
app = Flask(__name__)
CORS(app)       # allow Cross Origin Resource Sharing with Flask

input_link = {} # store transaction_id and its answer
summary = {}
@app.route('/home/webscrap/<transaction_id>', methods=['POST','GET'])
def handleWebScrap(transaction_id):
    # POST request
    if request.method == 'POST':
        print(transaction_id)
        input_link[transaction_id] = webScrap(request.form['input'])
        return 'OK', 200
    else:
        return {'result': input_link[transaction_id]}

@app.route('/home/summarize/<transaction_id>', methods=['POST','GET'])
def handleSummarize(transaction_id):
    # POST request
    if request.method == 'POST':
        summary[transaction_id] = summarize(request.form['input'])
        return 'OK', 200
    else:
        print(summary[transaction_id])
        return {'result': summary[transaction_id]}
    
# run app
app.run(debug=True, host='localhost', port=8989)

# https://www.thairath.co.th/news/local/1830689