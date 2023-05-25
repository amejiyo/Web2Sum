from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

# import model
from model.mT5thai.mT5Thai import Mt5Thai 
from model.TFIDF_TextRank.tfidf import TFIDF
from model.TFIDF_TextRank.textRank import TextRank
# web scrapping
from webScrap import webScrap

import warnings
warnings.filterwarnings("ignore")


# create route for python app server
app = Flask(__name__)
cors = CORS(app)     # allow Cross Origin Resource Sharing with Flask

# mt5 = Mt5Thai()
textrank = TextRank()
tfidf = TFIDF()

model = {"mT5": textrank, "TextRank": textrank, "TFIDF": tfidf}

summerizer_name = "mT5"
print("server is ready")

input_link = {} # store transaction_id and its answer
summary = {}

@app.after_request 
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    # Other headers can be added here if needed
    return response

@app.route('/home/webscrap/<transaction_id>/', methods=['POST','GET'])
@cross_origin()
def handleWebScrap(transaction_id):
    # POST request
    if request.method == 'POST':
        print(request.form)
        input_link[transaction_id] = webScrap(request.form['input'])
        for i in model.keys():
            model[i].reset_min_length()
        return 'OK', 200
    else:
        return {'result': input_link[transaction_id]}

@app.route('/home/summarize/<transaction_id>/', methods=['POST','GET'])
@cross_origin()
def handleSummarize(transaction_id):
    # POST request
    if request.method == 'POST':
        for i in model.keys():
            if i == request.form['model']:
                print(request.form['model'])
                model[i].reset_min_length()
                model[i].tokenize(input_link[transaction_id])
                summary[transaction_id] = model[i].summarize()
        return 'OK', 200
    else:
        if summary[transaction_id][0] == 200:
            return {'flag': '1', 'input_text': summary[transaction_id][2], 'result':summary[transaction_id][1], 'length':summary[transaction_id][3]}
        else:
            return {'flag': '0', 'input_text': "-1", 'result':summary[transaction_id][1]}

@app.route('/home/summarize_edit/<transaction_id>/', methods=['POST','GET'])
@cross_origin()
def handleEditSummarize(transaction_id):
    # POST request
    if request.method == 'POST':
        print("this is input edit sum req")
        for i in model.keys():
            if i == request.form['model']:
                print(request.form['model'], " ", request.form['input'])
                if request.form['input'] == 'longer':
                    summary[transaction_id] = model[i].get_longer()
                else:
                    summary[transaction_id] = model[i].get_shorter()
            else:
                model[i].reset_min_length()
        return 'OK', 200
    else:
        if summary[transaction_id][0] == 200:
            return {'flag': '1', 'input_text': summary[transaction_id][2], 'result':summary[transaction_id][1], 'length':summary[transaction_id][3]}
        else:
            return {'flag': '0', 'input_text': "-1", 'result':summary[transaction_id][1]}
        
# run app
app.run(debug=True, host="0.0.0.0", port=8989)
# app.run()