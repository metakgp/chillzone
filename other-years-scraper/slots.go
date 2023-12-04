package main

import (
	"log"
	"os"
	"strings"
)

func build_slots() map[string][][2]int {
	ret := make(map[string][][2]int)

	b, err := os.ReadFile("slots.1")
	if err != nil {
		log.Fatal("Could not read the slots file from disk: ", err)
	}

	slots := strings.Split(string(b), "\n")

	for _, v := range slots {
		components := strings.Split(v, " ")
		ret[components[0]] = [][2]int{}
		for i := 1; i < len(components); i++ {
			ret[components[0]] = append(ret[components[0]], [2]int{
				int(components[i][0] - '0'),
				int(components[i][1] - '0'),
			})
		}
	}

	return ret
}
