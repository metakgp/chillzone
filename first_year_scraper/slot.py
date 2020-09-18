data = open("../slots.1").read()
data = data.split("\n")

slot_map = {}
for slot in data:
    row = slot.split(" ")
    slot_map[row[0]] = row[1:]
