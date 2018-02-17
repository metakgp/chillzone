package main

import (
    "log"
    "strings"
)

func build_room_schedule(subs map[string][]map[string]string) map[string][][]string {

    sched := make(map[string][][]string)
    for _, k := range rooms {
        sched[k] = [][]string{}

        for i := 0; i < 5; i++ {
            sched[k] = append(sched[k], []string{})
            for j := 0; j < 9; j++ {
                sched[k][i] = append(sched[k][i], "")
            }
        }

    }

    slots_ref := build_slots()
    room_not_found := []string{}

    for _, dep_subs := range subs {
        for _, sub := range dep_subs {
            rooms := strings.Split(sub["Room"], ",")
            slots := strings.Split(sub["Slot"], ",")

            for _, r := range rooms {
                r = strings.TrimSpace(r)
                for _, s := range slots {
                    s = strings.TrimSpace(s)
                    slot := slots_ref[s]
                    for _, comps := range slot {
                        log.Printf("Assigning to %s %d %d", r, comps[0], comps[1])
                        _, e := sched[r]
                        if !e {
                            log.Printf("Room not found in the existing list: %s", r)
                            room_not_found = append(room_not_found, r)
                        } else {
                            sched[r][comps[0]][comps[1]] = sub["Code"]
                        }
                    }
                }
            }
        }
    }

    log.Print(sched)
    log.Print(room_not_found)

    return sched
}
