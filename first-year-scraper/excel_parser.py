import camelot

def parse_pdf(filename, target_filename):
    print("Started processing pdf file. This might take a while...")
    tables = camelot.read_pdf(filename, pages='1-end', copy_text=['h']) # if you are here to change args please be sure that you know what you are doing
    tables.export(target_filename, f="excel")
    print("Done parsing pdf. exported as: ", target_filename)

if __name__ == "__main__":
    parse_pdf("test.pdf","test.xlsx")