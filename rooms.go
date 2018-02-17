package main

var rooms = []string{
    "NR121",
    "NR122",
    "NR123",
    "NR124",
    "NR221",
    "NR222",
    "NR223",
    "NR224",
    "NR321",
    "NR322",
    "NR323",
    "NR324",
    "NR421",
    "NR422",
    "NR423",
    "NR424",
    "NC141",
    "NC142",
    "NC131",
    "NC132",
    "NC241",
    "NC242",
    "NC243",
    "NC244",
    "NC231",
    "NC232",
    "NC233",
    "NC234",
    "NC341",
    "NC342",
    "NC343",
    "NC344",
    "NC331",
    "NC332",
    "NC333",
    "NC334",
    "NC441",
    "NC442",
    "NC443",
    "NC444",
    "NC431",
    "NC432",
    "NC433",
    "NC434",
    "V1",
    "V2",
    "V3",
    "V4",
}

func get_init_room_map() map[string][5][9]int {
    ret := make(map[string][5][9]int)
    for _, k := range rooms {
        ret[k] = [5][9]int{}
    }
    return ret
}
