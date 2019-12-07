import textract
import os

cur_dir = os.path.abspath(os.path.dirname(__file__))
text = str(textract.process(os.path.join(cur_dir, 'TimeTable.docx')))
text = text.replace("\\n","\n")
text = text.replace("\\t","\n")
lines = text.split("\n")

for i in range(0,len(lines)):
    lines[i]=lines[i].replace("\n","")
lines = list(filter(lambda a: any(c.isalpha() for c in a),lines))
# print("\n".join(lines))
with open("semData.txt","w") as fout :
    fout.write("\n".join(lines))
