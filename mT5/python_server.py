from flask import Flask, jsonify, request
from flask_cors import CORS

# for create python app only 
def webScrap(URL):
    # edit here
    return URL

def summarize(text):
    # edit here
    return text


# create route for python app server
app = Flask(__name__)
CORS(app)       # allow Cross Origin Resource Sharing with Flask

input_link = {} # store transaction_id and its answer
@app.route('/home/webscrap/<transaction_id>', methods=['POST','GET'])
def handleWebScrap(transaction_id):
    # POST request
    if request.method == 'POST':
        input_link[transaction_id] = webScrap(request.form['input'])
        print(request.form['input'])
        return 'OK', 200
    else:
        return {'result': input_link[transaction_id]}

@app.route('/home/summarize/<transaction_id>', methods=['POST','GET'])
def handleSummarize(transaction_id):
    # POST request
    if request.method == 'POST':
        input_link[transaction_id] = webScrap(request.form['input'])
        print(request.form['input'])
        return 'OK', 200
    else:
        return {'result': input_link[transaction_id]}
    
# run app
app.run(debug=True, host='localhost', port=8989)

# https://www.thairath.co.th/news/local/1830689