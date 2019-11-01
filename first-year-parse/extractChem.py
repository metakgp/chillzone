import csv

lines = []
with open("csem.txt") as inpfile :
    lines = inpfile.read().split('\n')

subjects = ["MA","EE","HS","CY"]
subDuration = 2
labs = ["ELECTRICAL","CHEMISTRY","HS LAB","MANUF. PROCESSES"]
labDuration = [3,3,2,3]
emptySlot = "#"

slotList = ['00', '01', '02', '03', '04', '10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34', '40', '41', '42', '43', '44','05', '06', '07', '08', '15', '16', '17', '18', '25', '26', '27', '28', '35', '36', '37', '38', '45', '46', '47', '48']
slotSize = len(slotList)
MAX_LENGTH = 10

def isSub(line) :
    for subject in subjects :
        if subject in line and len(line)<MAX_LENGTH  and "LAB" not in line :
            return True
    return False

def isLab(line) :
    for lab in labs :
        if lab in line :
            return labs.index(lab)
    return -1

def isRoom(line) :
    rooms = ["NC","NR","F","V"]
    for room in rooms :
        if room in line and len(line)<2*MAX_LENGTH and "FRI" not in line :
            return True
    return False

current_slot = 0

sectionIndexes = []
for i in range(0,len(lines)) : # separating sections
    if "FIRST YEAR TIME TABLE" in lines[i] :
        sectionIndexes.append(i)

sectionIndexes.append(len(lines))
slotsInfo = []
with open("slots.1","r") as csv_file : # load slots
    text = csv_file.read().split("\n")
    for row in text :
        row = row.split(",")
        tempList = []
        for i in range(1,len(row)) :
            tempList.append(row[i])
        slotsInfo.append((row[0],tempList))

schedule = []

for i in range(0,len(sectionIndexes)-1) :
    tempLines = lines[sectionIndexes[i]:sectionIndexes[i+1]]
    subs = []
    rooms = []
    slots = []

    for line in tempLines :
        line = line.strip()
        if line == emptySlot :
            current_slot=(current_slot+1)%slotSize
        elif isLab(line) != -1 :
            current_slot=(current_slot+labDuration[isLab(line)])%slotSize
        elif isSub(line) :
            subs.append(line)
            slots.append(slotList[current_slot])
            current_slot = (current_slot+1)%slotSize
        elif isRoom(line) :
            rooms.append(line)
        #TO DEBUG pre processing
        # print(line)
        # print(current_slot)
        # if i > 2 :
        #     x = input()
    dict = {}
    for sub in subjects :
        dict[sub] = []
        room = ""
        for j in range(0,len(subs)) :
            if subs[j] == sub :
                dict[sub].append(slots[j])
                room = rooms[j]
        schedule.append({"sub":sub,"slots":dict[sub],"room":room})

subjectsinfo = {}
with open("first-year.csv","r") as csv_file :
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader :
        if(row[0] not in subjectsinfo) :
            subjectsinfo[row[0]] = {'code':row[1],'course':row[2],'aaa':'--',"dis":row[4],"cred":row[5]}

output = []
for i in range(0,len(schedule)) :
    subSlot = None
    for slot in slotsInfo : # To find slot with distribution
        if schedule[i]["slots"] == slot[1] :
            subSlot = slot[0]
            break

    if subSlot == None : # To ignore the tutorial slot
        for slot in slotsInfo :
            li1 = schedule[i]["slots"]
            li2 = slot[1]
            if len([i for i in li1+li2 if i not in li1 or i not in li2]) ==1 and len(li1)<len(li2) :
                subSlot = slot[0]
                break

    
    temp = {"slot":slot[0],"room":schedule[i]["room"],"sub":schedule[i]["sub"],"dist":schedule[i]["slots"]}
    temp.update(subjectsinfo[schedule[i]["sub"]])
    output.append(temp)
    # print(temp)

with open("first-year-new.csv","w") as csv_file : # output
    fields = ['sub','code','course','aaa',"dis","cred","slot","room","dist"]
    csv_writer = csv.DictWriter(csv_file,fieldnames=fields)
    csv_writer.writeheader()
    csv_writer.writerows(output)