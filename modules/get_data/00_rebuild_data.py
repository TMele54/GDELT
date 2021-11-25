from a_id_files import get_file_list as A
from b_extract_relevant_rows import download_raw_tsvs as B
from c_files_to_pandas import create_data_frames as C


def run():
    input("Download Files?")
    A(100, False)
    input("Stash Files into a pickle?")
    B()
    input("Query terms in titles?")
    C()

run()