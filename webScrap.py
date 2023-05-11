import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def webScrap(URL):
    page = requests.get(URL)
    page.encoding = "utf-8"
    soup = BeautifulSoup(page.text, 'html.parser')
    # print(soup)
    # print(soup.prettify())
    courses = soup.find_all('p')
    text = []
    for i in courses:
        text.append(i.get_text())
    ans = " ".join(text).replace("...", "")
    # print(ans)
    return ans

print(webScrap("https://edition.cnn.com/politics/live-news/trump-cnn-town-hall/index.html"))