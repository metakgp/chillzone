package main

import (
	"encoding/json"
	"io/ioutil"
)

type Room struct {
	Number string `json:"number"`
}

func GetRooms(filename string) ([]Room, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var rooms []Room
	err = json.Unmarshal(data, &rooms)
	if err != nil {
		return nil, err
	}
	return rooms, nil
}

var rooms, _ = GetRooms("rooms.json")
