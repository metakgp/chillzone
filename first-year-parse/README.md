1. Convert pdf to .docx (use `https://pdf2doc.com`),copy it in the first-year parse directory,rename it to `TimeTable.docx` and Run `textExtract.py`

2. In the `semData.txt` file :

        * delete all text apart from first year time table data and odd section data

        * add a  "#" character for every empty slot

        * duplicate subject and room entries for double lectures in the text file

3. Run `python extract.py`

To be added manually : All Tutorial and Mechanics for even sections(if needed)

Note : first-year-data.csv is to extract meta-data for all courses and the new timetable generated is first-year.csv