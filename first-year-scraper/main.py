import excel_parser
import generate_subjectDetails
import generate_schedule

target_filename = "workbook.xlsx"

filename = input("\nEnter the first year timetable pdf file name: ")

excel_parser.parse_pdf(filename, target_filename)
generate_schedule.format_excel(target_filename, generate_subjectDetails.generate_subjectDetails())