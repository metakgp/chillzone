package chillz

import (
	"encoding/json"
	"io/ioutil"
)

type Room struct {
	Room     string `json:"room"`
	Location string `json:"location"`
}

type Rooms []Room

// Fetches all the rooms from a JSON file, primarily rooms.json
//
func GetRooms(filename string) (Rooms, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return Rooms{}, err
	}

	var rooms Rooms
	err = json.Unmarshal(data, &rooms)
	if err != nil {
		return Rooms{}, err
	}
	return rooms, nil
}

func get_init_room_map(rooms Rooms) map[string][5][9]int {
	ret := make(map[string][5][9]int)
	for _, k := range rooms {
		ret[k.Room] = [5][9]int{}
	}
	return ret
}
