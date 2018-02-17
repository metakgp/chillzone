package main

import (
    "fmt"
)

func build_subject_details(subs map[string][]map[string]string) map[string]string {
    ret := make(map[string]string)

    for _, dep_subs := range subs {
        for _, sub := range dep_subs {
            ret[sub["Code"]] = fmt.Sprintf("%s - %s", sub["Name"], sub["Profs"])
        }
    }

    return ret
}
