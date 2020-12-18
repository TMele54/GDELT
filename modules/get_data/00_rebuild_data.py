from modules.get_data.a_id_files import get_file_list as A
from modules.get_data.b_extract_relevant_rows import download_raw_tsvs as B
from modules.get_data.c_files_to_pandas import create_data_frames as C

def main():
    if __name__== "__main__" :
        A()
        B()
        C()

main()
