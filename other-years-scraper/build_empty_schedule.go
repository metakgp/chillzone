package main

import (
	"sort"
)

func build_empty_schedule(rooms map[string][][]string) [][][]string {
	empty_sched := [][][]string{}

	for i := 0; i < 5; i++ {
		empty_sched = append(empty_sched, [][]string{})
		for j := 0; j < 9; j++ {
			empty_sched[i] = append(empty_sched[i], []string{})
		}
	}

	for room, schedule := range rooms {
		for i := 0; i < 5; i++ {
			for j := 0; j < 9; j++ {
				if schedule[i][j] == "" {
					empty_sched[i][j] = append(empty_sched[i][j], room)
					sort.Strings(empty_sched[i][j])
				}
			}
		}
	}

	return empty_sched
}
