from flask import Flask, jsonify, request
from flask_cors import CORS

# webScraptor
from bs4 import BeautifulSoup
import requests

#mT5
from package.mt5_thai_script import Mt5Thai 

import warnings
warnings.filterwarnings("ignore")

# for create python app only 
def webScrap(URL):
    # Fetch the page and create a Beautiful Soup object
    page = requests.get(URL)
    soup = BeautifulSoup(page.text)
    return soup.get_text()

# create route for python app server
app = Flask(__name__)
CORS(app)       # allow Cross Origin Resource Sharing with Flask

summarizer = Mt5Thai()
print("server is ready")

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
        summarizer.tokenize(request.form['input'])
        summary[transaction_id] = summarizer.summarize()
        return 'OK', 200
    else:
        if summary[transaction_id][0] == 200:
            return {'flag': '1', 'input_text': summary[transaction_id][2], 'result':summary[transaction_id][1]}
        else:
            return {'flag': '0', 'input_text': "-1", 'result':summary[transaction_id][1]}

@app.route('/home/summarize_edit/<transaction_id>', methods=['POST','GET'])
def handleEditSummarize(transaction_id):
    # POST request
    if request.method == 'POST':
        print("this is input edit sum req")
        print(request.form['input'] == 'longer')
        if request.form['input'] == 'longer':
            summary[transaction_id] = summarizer.get_longer()
        else:
            summary[transaction_id] = summarizer.get_shorter()
        return 'OK', 200
    else:
        if summary[transaction_id][0] == 200:
            return {'flag': '1', 'input_text': summary[transaction_id][2], 'result':summary[transaction_id][1]}
        else:
            return {'flag': '0', 'input_text': "-1", 'result':summary[transaction_id][1]}
        
# run app
app.run(debug=True, host='localhost', port=8989)
