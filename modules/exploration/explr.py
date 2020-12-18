import pandas as pd
import numpy as np

# Pandas Settings
pd.set_option('display.max_columns', None)

# Paths
dfPath = "../../static/data/python_files/dataframes/backupUS_0.pickle"

# Open Files
df0 = pd.read_pickle(dfPath)


# Display
print(df0.head())

for c in df0.columns:
    print('"'+c+'",')

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
print("*"*184)
subs = df0.iloc[:1]

print("*"*184)
print("Total Records ",len(df0.index))

print("*"*184)
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


terms = ["pharma"]
lnks=[]
for term in terms:
    S = df[df['SOURCEURL'].str.contains(term, na=False)]
    for item in S["SOURCEURL"]:
        if not any(x in item for x in ['corona', 'covid', 'vaccine', 'pandemic', 'virus']):
            lnks.append(item)
            print(item)

    print("F"*184)
    print(term+"----->", len(S.index))
    print(term+"set ----->", len(set(lnks)))

