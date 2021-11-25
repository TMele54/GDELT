from os.path import isfile, join
from os import listdir
import pandas as pd
import numpy as np
import pickle
import json

# Pandas Settings
pd.set_option('display.max_columns', None)

# Field Names
fields = [
                "SQLDATE", "MonthYear", "Year", "FractionDate", "Actor1Code", "Actor1Name", "Actor1CountryCode",
                "Actor1KnownGroupCode",  "Actor1Religion1Code", "Actor1Religion2Code", "Actor1Type1Code",
                "Actor1Type2Code", "Actor1Type3Code", "Actor2Code", "Actor2Name", "Actor2CountryCode",
                "Actor2KnownGroupCode", "Actor2EthnicCode", "Actor2Religion1Code", "Actor2Religion2Code",
                "Actor2Type1Code", "Actor2Type2Code", "Actor2Type3Code", "IsRootEvent", "EventCode", "EventBaseCode",
                "EventRootCode", "QuadClass", "GoldsteinScale", "NumMentions", "NumSources", "NumArticles", "AvgTone",
                "Actor1Geo_Type", "Actor1Geo_FullName", "Actor1Geo_CountryCode", "Actor1Geo_ADM1Code", "Actor1Geo_Lat",
                "Actor1Geo_Long", "Actor1Geo_FeatureID", "Actor2Geo_Type", "Actor2Geo_FullName",
                "Actor2Geo_CountryCode", "Actor2Geo_ADM1Code", "Actor2Geo_Lat", "Actor2Geo_Long", "Actor2Geo_FeatureID",
                "ActionGeo_Type", "ActionGeo_FullName", "ActionGeo_CountryCode", "ActionGeo_ADM1Code", "ActionGeo_Lat",
                "ActionGeo_Long", "ActionGeo_FeatureID", "DATEADDED", "SOURCEURL"
]

# Paths
dfPath = "static/data/python_files/dataframes/"

# Open Pickle Files and join DataFrames
def read_dfs(dfPath):
    onlyfiles = [f for f in listdir(dfPath) if isfile(join(dfPath, f))]
    dfs = list()
    for file in onlyfiles:
        print(file)
        dfs.append(pd.read_pickle(dfPath+file))

    return pd.concat(dfs)

# Get DataFrame
df0 = read_dfs(dfPath=dfPath)

print("*"*100)
subs = df0.iloc[:1]

print("*"*100)
print("Total Records ",len(df0.index))
print("*"*100)
df = df0

# Remove Nulls
#df = df0[df0.Actor1Name.notnull()]
#df = df[df.Actor1Name.notnull()]
#print("Remaining not null Records ", len(df.index))

# Remove NA
#df = df.dropna(how='all', subset=['Actor1Name', 'Actor2Name'])
#print("Remaining not NA Records ", len(df.index))

# Remove Nan
#df = df[df['Actor1Name'].notna()]
#df = df[df['Actor2Name'].notna()]

#print("Remaining not NaN Records ", len(df.index))
#A1 = df[df['Actor1Name'].str.contains("drug", na=False)]
#A2 = df[df['Actor1Name'].str.contains("drug", na=False)]

desired_terms = ["crypto", "shiba", "bitcoin", "ethereum", "dogecoin", "crypto.com"]
desired_terms = ["shiba"]
undesirable_terms = []


for url_term in desired_terms:
    lnks=[]
    dts=[]
    men=[]
    sor=[]
    art=[]
    ton=[]

    S = df[df['SOURCEURL'].str.contains(url_term, na=False)]
    for item in S["SQLDATE"]:
        dts.append(item)
    for item in S["NumMentions"]:
        men.append(item)
    for item in S["NumSources"]:
        sor.append(item)
    for item in S["NumArticles"]:
        art.append(item)
    for item in S["AvgTone"]:
        ton.append(item)


    for item in S["SOURCEURL"]:
        if not any(x in item for x in undesirable_terms):
            lnks.append(item)

    print("\\"*100)
    print([len(dts), len(lnks)])
    print(url_term + "----->", len(S.index))
    print(url_term + "-set (unique) ----->", len(set(lnks)))

    links = list()
    for i in range(0,len(lnks)):
        links.append({
                "url": lnks[i],
                "date": dts[i],
                "mentions": men[i],
                "sources": sor[i],
                "articles": art[i],
                "tone": ton[i],
            })

    with open("static/data/url_responses/relevant_"+url_term+"_urls.json", "w") as F:
        json.dump(links, F, indent=4)
