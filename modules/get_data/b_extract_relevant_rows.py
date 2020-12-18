import os.path
import urllib
import urllib.request
import zipfile
import glob
import operator
import pickle

def download_raw_tsvs():
    python_files_path = '../../static/data/python_files/'
    gdelt_base_url = 'http://data.gdeltproject.org/events/'
    local_path = '../../static/data/GDELT/'

    fips_country_code = 'US'
    infilecounter = 0
    outfilecounter = 0

    with open(python_files_path+'file_list.pkl', 'rb') as handle:
        file_list = pickle.load(handle)

    for compressed_file in file_list[infilecounter:]:
        print(compressed_file)

        # if we dont have the compressed file stored locally, go get it. Keep trying if necessary.
        while not os.path.isfile(local_path + compressed_file):
            print('Downloading')
            urllib.request.urlretrieve(url=gdelt_base_url + compressed_file, filename=local_path + compressed_file)

        # extract the contents of the compressed file to a temporary directory
        print('Extracting')
        z = zipfile.ZipFile(file=local_path + compressed_file, mode='r')
        z.extractall(path=local_path + 'tmp/')

        # parse each of the csv files in the working directory,
        print('Parsing')
        for infile_name in glob.glob(local_path + 'tmp/*'):
            outfile_name = local_path + 'country/' + fips_country_code + '%04i.tsv' % outfilecounter

            # open the infile and outfile
            with open(infile_name, mode='r', encoding="utf-8") as infile, open(outfile_name, mode='w', encoding="utf-8") as outfile:
                for line in infile:
                    # extract lines with our interest country code
                    if fips_country_code in operator.itemgetter(51, 37, 44)(line.split('\t')):
                        outfile.write(line)
                outfilecounter += 1

            # delete the temporary file
            os.remove(infile_name)
        infilecounter += 1

    print("b_extract_relevant_rows.py has completed writing zips and tsvs to ",  local_path)