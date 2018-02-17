package main

import (
    "log"
    "strings"
)

func build_room_schedule(subs map[string][]map[string]string) map[string][][]int {

    sched := make(map[string][][]int)
    for _, k := range rooms {
        sched[k] = [][]int{}

        for i := 0; i < 5; i++ {
            sched[k] = append(sched[k], []int{})
            for j := 0; j < 9; j++ {
                sched[k][i] = append(sched[k][i], 0)
            }
        }

    }

    slots_ref := build_slots()

    for _, dep_subs := range subs {
        for _, sub := range dep_subs {
            rooms := strings.Split(sub["Room"], ",")
            slots := strings.Split(sub["Slot"], ",")

            for _, r := range rooms {
                for _, s := range slots {
                    slot := slots_ref[s]
                    for _, comps := range slot {
                        log.Printf("Assigning to %s %d %d", r, comps[0], comps[1])
                        _, e := sched[r]
                        if !e {
                            log.Printf("Room not found in the existing list: %s", r)
                        } else {
                            sched[r][comps[0]][comps[1]] = 1
                        }
                    }
                }
            }
        }
    }

    log.Print(sched)

    return sched
}
