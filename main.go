package main

import (
    "log"
    "github.com/joho/godotenv"
    "io/ioutil"
    "encoding/json"
    "os"
    // "fmt"
)

type ParsedResult struct{
    Subjects [][]string
    Department string
}

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Print("Couldn't load env variables from .env")
	}

	departments := []string{
        "AE",
        "AR",
        "CS",
        "ME",
        "MA",
        "CH",
        "EC",
        "EE",
	}

    allSubjects := make(map[string][][]string)

    _, err = os.Stat("all_subjects.json")
    no_file := err != nil

    if no_file {

        accumulate_channel := make(chan ParsedResult)

        for _, v := range departments {
            dep := v
            go func() {
                t := parse_html(dep_timetable(dep))
                log.Printf("Found %d subjects in department %s", len(t), dep)
                accumulate_channel <- ParsedResult{t, dep}
            }()
        }

        for i := 0; i < len(departments); i++ {
            dep_val := <-accumulate_channel
            log.Printf("Fetch completed for department %s with %d subjects",
            dep_val.Department,
            len(dep_val.Subjects))

            allSubjects[dep_val.Department] = dep_val.Subjects
        }

        b, err := json.Marshal(allSubjects)
        if err != nil {
            b = []byte("")
        }

        err = ioutil.WriteFile("all_subjects.json", b, 0644)
        if err != nil {
            log.Printf("Could not write subjects.json to file: %v", err)
        }
    } else {
        b, err := ioutil.ReadFile("all_subjects.json")
        if err != nil {
            log.Fatal(err)
        }

        err = json.Unmarshal(b, &allSubjects)
        if err != nil {
            log.Fatal(err)
        }
    }

    transformedMap := change_map_structure(allSubjects)
    log.Print(transformedMap)

    subjectDetails := build_subject_details(transformedMap)
    b, err := json.Marshal(subjectDetails)
    if err != nil {
        log.Fatal("Could not marshal subjectDetails to JSON: ", err)
    }
    err = ioutil.WriteFile("subjectDetails.json", b, 0644)
    if err != nil {
        log.Fatal("Could not write to subjectDetails.json: ", err)
    }

    schedule := build_room_schedule(transformedMap)
    b, err = json.Marshal(schedule)
    if err != nil {
        log.Fatal("Could not marshal schedule to JSON: ", err)
    }
    err = ioutil.WriteFile("schedule.json", b, 0644)
    if err != nil {
        log.Fatal("Could not write to schedule.json: ", err)
    }
}
