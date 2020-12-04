import requests
import lxml.html as lh
import pickle


def get_file_list():
    gdelt_base_url = 'http://data.gdeltproject.org/events/'
    python_files_path = '../static/data/python_files/'

    # get the list of all the links on the gdelt file page
    page = requests.get(gdelt_base_url+'index.html')
    doc = lh.fromstring(page.content)
    link_list = doc.xpath("//*/ul/li/a/@href")

    # separate out those links that begin with four digits
    file_list = [x for x in link_list if str.isdigit(x[0:4])]

    for file in file_list:
        print(file)

    with open(python_files_path+'file_list.pkl', 'wb') as handle:
        pickle.dump(file_list, handle, protocol=pickle.HIGHEST_PROTOCOL)

    print("a_id_files.py has completed writing file lists to ", python_files_path+"file_list.pkl")