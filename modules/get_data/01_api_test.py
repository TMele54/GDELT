import json, requests
import datetime

# ref https://drkblake.com/gdeltintro/

qs = ["crypto"]
time = ["30","24h","3w","2m"] # 30 is in minutes but not working, using start and end datetimes
max_count = 250

now = datetime.datetime.now()
ago = datetime.timedelta(minutes=30)
delta = now-ago
start_time = delta.strftime("%Y%m%d%H%M%S")
now = now.strftime("%Y%m%d%H%M%S")


for Q in qs:
    print("Processing", Q)
    url = "https://api.gdeltproject.org/api/v2/doc/doc?format=html" \
          "&query="+Q + \
          "&mode=artlist" \
          "&maxrecords="+str(max_count) + \
          "&format=json" \
          "&startdatetime="+str(start_time) + \
          "&enddatetime="+str(now)

    response = requests.get(url)
    json_data = json.loads(response.text)

    with open("../../static/data/url_responses/"+Q+"_test.json", "w") as F:
        json.dump(json_data, F, indent=4)

    for j in json_data["articles"]:
        print(j["url"])

    print(len(json_data["articles"]))