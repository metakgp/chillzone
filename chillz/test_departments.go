package chillz

import (
	"fmt"
	"log"
)

func testGetDepartments() {
	depts, err := GetDepartments("departments.json")
	if err != nil {
		log.Fatal(err)
	}
	for _, dep := range depts {
		fmt.Println(dep.Code)
	}
}
