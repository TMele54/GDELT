import os.path
import urllib
import zipfile
import glob
import operator
import pickle

local_path = '/Users/me/Desktop/GDELT_Data/'

fips_country_code = 'UK'


with open('filename.pickle', 'rb') as handle:
    file_list = pickle.load(handle)

for compressed_file in file_list[infilecounter:]:
    print
    compressed_file,

    # if we dont have the compressed file stored locally, go get it. Keep trying if necessary.
    while not os.path.isfile(local_path + compressed_file):
        print
        'downloading,',
        urllib.urlretrieve(url=gdelt_base_url + compressed_file,
                           filename=local_path + compressed_file)

    # extract the contents of the compressed file to a temporary directory
    print
    'extracting,',
    z = zipfile.ZipFile(file=local_path + compressed_file, mode='r')
    z.extractall(path=local_path + 'tmp/')

    # parse each of the csv files in the working directory,
    print
    'parsing,',
    for infile_name in glob.glob(local_path + 'tmp/*'):
        outfile_name = local_path + 'country/' + fips_country_code + '%04i.tsv' % outfilecounter

        # open the infile and outfile
        with open(infile_name, mode='r') as infile, open(outfile_name, mode='w') as outfile:
            for line in infile:
                # extract lines with our interest country code
                if fips_country_code in operator.itemgetter(51, 37, 44)(line.split('\t')):
                    outfile.write(line)
            outfilecounter += 1

        # delete the temporary file
        os.remove(infile_name)
    infilecounter += 1
    print
    'done'