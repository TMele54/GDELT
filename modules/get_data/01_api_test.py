import json, requests

drugs = ["relugolix", "vibegron"]

for K in drugs:
    print("Processing", K)
    url = "https://api.gdeltproject.org/api/v2/doc/doc?format=html&timespan=FULL&query="+K+"&mode=artlist&maxrecords=250&format=json"
    response = requests.get(url)
    json_data = json.loads(response.text)

    with open("../../static/data/url_responses/"+K+"_test.json", "w") as F:
        json.dump(json_data, F, indent=4)
