package main

import (
	"encoding/json"
	"os"
)

type Department struct {
	Code string `json:"code"`
}

func GetDepartments(filename string) ([]Department, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var departments []Department
	err = json.Unmarshal(data, &departments)
	if err != nil {
		return nil, err
	}
	return departments, nil
}
