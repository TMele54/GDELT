import string
import random

t = range(0,1000,1)

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

for cnk in chunks(t, 100):
    print(cnk)

