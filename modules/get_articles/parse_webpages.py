from bs4 import BeautifulSoup
from bs4.element import Comment
import urllib.request
import requests
import time
import pandas as pd
import csv, json
import pyautogui
import numpy as np

json_file_path = '../../static/data/url_responses/'

def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True
def text_from_html(body):
    soup = BeautifulSoup(body, 'html.parser')
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)
    return u" ".join(t.strip() for t in visible_texts)

def query_pages(pth, file_name):
    with open(pth+file_name, "r") as F:
        data = json.load(F)
        data = data["articles"]
        outs = []
        for item in data:
            js = {}
            js["title"] = item["title"]
            js["url"] = item["url"]
            URL = item["url"]
            if "http" in item["url"]:
                try:
                    content = requests.get(URL)
                    soup = BeautifulSoup(content.text, 'html.parser')
                    body = soup.find_all('body')
                    ps = body[0].find_all('p')
                    spans = body[0].find_all('span')
                    print(ps)
                    x = ps+spans

                    # Unifying the paragraphs
                    list_paragraphs = []
                    for p in np.arange(0, len(ps)):
                        paragraph = x[p].get_text()
                        list_paragraphs.append(paragraph)
                        final_article = " ".join(list_paragraphs)

                    js["article_text"] = final_article

                except:
                    print("ERROR    "*100)

                outs.append(js)
            else:
                pass

            # input("CONTINUE?")

        F.close()
    return outs

files = ["crypto_test.json"]

pyautogui.hotkey('ctrl', 'l')

for file_name in files:
    print("Processing File", file_name)
    print("*"*184)
    data = query_pages(json_file_path, file_name)
    base = file_name.split('.')[0]
    ext = file_name.split('.')[1]
    with open(json_file_path+base+"_text."+ext, "w") as FF:
        json.dump(data, FF, sort_keys=True,  indent=4)
        FF.close()
