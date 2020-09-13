data = open("../slots.1").read()
data = data.split("\n")

slot_map = {}
for slot in data:
    row = slot.split(" ")
    for i in range(1, len(row)):
        slot_map[row[i]] = row[0]
# print("sm from slot.py: ", slot_map)