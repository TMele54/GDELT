import glob, os
import pandas as pd
from pathlib import Path

def create_data_frames():
    python_files_path = 'static/data/python_files/'
    gdelt_base_url = 'http://data.gdeltproject.org/events/'
    local_path = 'static/data/GDELT/'

    fips_country_code = 'US'

    # Get the GDELT field names from a helper file
    colnames = pd.read_excel('static/data/python_files/header/CSV.header.fieldids.xlsx', sheet_name='Sheet1', index_col='Column ID')['Field Name']

    # Build DataFrames from each of the intermediary files
    files = glob.glob(local_path + 'country/' + fips_country_code + '*')
    DFlist = []

    def chunks(l, n):
        n = max(1, n)
        return (l[i:i+n] for i in range(0, len(l), n))

    x=0
    for cnk in chunks(files, 2):
        print("Processing file Chunk", x)
        my_file = Path(python_files_path + "dataframes"+"\\" + 'backup' + fips_country_code + "_" + str(x) +'.pickle')
        if my_file.is_file():
            pass
        else:
            for i in cnk:
                print("Processing file ", i)
                DFlist.append(pd.read_csv(i, sep='\t', header=None, dtype=str, names=colnames, index_col=['GLOBALEVENTID']))

            # Merge the file-based dataframe0 and save a pickle
            print("Concatenating Dataframes")
            DF = pd.concat(DFlist)
            print("Writing Pickle to File for chunk ")
            DF.to_pickle(python_files_path + "dataframes"+"/" + 'backup' + fips_country_code + "_" + str(x) +'.pickle')
            DF=pd.DataFrame()
            DFlist=[]

        x += 1

    print("c_files_to_pandas.py has completed writing dataframes to ",  python_files_path+"dataframes")
