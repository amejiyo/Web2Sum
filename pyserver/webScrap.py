#!/usr/bin/env python

from bs4 import BeautifulSoup
import requests
import re

# for create python app only 
def webScrap(URL):
    page = requests.get(URL)
    soup = BeautifulSoup(page.text, 'html.parser')

    ## remove ads work with Thairath only
    regex = re.compile('.*ads*')
    for ad in soup.find_all("div", {"class" : regex}):
        ad.decompose()
    text = ''
    for ele in soup.findAll("p", {'class': None}):
        if (ele.get_text() != "SPONSORED"):
            text+=ele.get_text()
    return text.replace("ข่าววิดีโอหนังสือพิมพ์ไทยรัฐทีวีไลฟ์สไตล์กีฬาบันเทิงดวงหวยนิยายโปรโมชั่นMONEYMIRRORTHAIRATH +", "")

# print(webScrap('https://www.thairath.co.th/news/politic/2694115'))