subject_map = {}
subject_map['CS'] = ["CS10001","Programming and Data Structures","--","3-0-0","3"]
subject_map['CY'] = ["CY11001","Chemistry","--","3-1-0","4"]
subject_map['EE'] = ["EE11001","Electrical Technology","--","3-1-0","4"]
subject_map['HS'] = ["HS13001","English","--","3-0-2","4"]
subject_map['MA'] = ["MA10002","Maths II","--","3-1-0","4"]
subject_map['ME'] = ["ME10001","Mechanics","--","3-1-0","4"]
subject_map['PH'] = ["PH11001","Physics","--","3-1-0","4"]

def restructure(slots):
    '''Use slot fillup generated by excel_formatter and convert it into usable csv type 2D array'''
    restructured_data = []
    for item in slots:
        enhanced = list(subject_map[item[0]])
        enhanced.append(item[1])
        enhanced.append(item[2])
        restructured_data.append(enhanced)

    return restructured_data