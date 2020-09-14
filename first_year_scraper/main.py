import csv
import excel_parser
import excel_formatter
import restructure

filename = input("Enter the pdf file name: ")
target_filename = "workbook.xlsx"
def get_sub(temp):
    return temp[0]

excel_parser.parse_pdf(filename, target_filename)
slots_fillup = excel_formatter.format_excel(target_filename)
print("slot fillup size: ",len(slots_fillup))

first_year_csv = restructure.restructure(slots_fillup)
first_year_csv = sorted(first_year_csv, key=get_sub)

with open("first_year.csv", "w") as f:
    csv_writer = csv.writer(f, delimiter=',')
    csv_writer.writerows(first_year_csv)

print("data exported to first_year.csv")
