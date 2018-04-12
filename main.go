package main

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/joho/godotenv"
	"github.com/metakgp/chillzone/chillz"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Print("Couldn't load env variables from .env")
	}

	// departments was a slice of strings, such as MA, EC.
	departments, err := chillz.GetDepartments("departments.json")
	if err != nil {
		log.Println("Unable to load departments:", err)
	} else {
		log.Printf("Fetched %d departments\n", len(departments))
	}

	allSubjects, err := chillz.GetAllDepartmentSubjects("all_subjects.json", departments)
	if err != nil {
		log.Fatal(err)
	}

	firstYearSubjects, err := chillz.GetFirstYearSubjects("first-year.csv")
	if err != nil {
		log.Fatal(err)
	}

	for _, firstYearSubject := range firstYearSubjects {
		allSubjects = append(allSubjects, firstYearSubject)
	}

	transformedMap := chillz.ChangeMapStructure(allSubjects)
	log.Print(transformedMap)

	b, err := json.Marshal(transformedMap)
	if err != nil {
		log.Fatal("Could not marshal subjectDetails to JSON: ", err)
	}
	err = ioutil.WriteFile("temp_transformed_map.json", b, 0644)
	if err != nil {
		log.Fatal("Could not write to subjectDetails.json: ", err)
	}

	subjectDetails := chillz.BuildSubjectDetails(transformedMap)
	b, err = json.Marshal(subjectDetails)
	if err != nil {
		log.Fatal("Could not marshal subjectDetails to JSON: ", err)
	}
	err = ioutil.WriteFile("subjectDetails.json", b, 0644)
	if err != nil {
		log.Fatal("Could not write to subjectDetails.json: ", err)
	}

	schedule := chillz.BuildRoomSchedule(transformedMap)

	type Combined struct {
		Room  string
		Day   int
		Slot  int
		Value string
	}

	// Add the problems that were reported by users and incorporate them in the
	// schedule

	problems := []Combined{
		Combined{"NC233", 0, 8, ""},
		Combined{"NC233", 3, 8, ""},
		Combined{"V1", 2, 5, "BS20001"},
		Combined{"V1", 2, 6, "BS20001"},
		Combined{"V2", 2, 5, "BS20001"},
		Combined{"V2", 2, 6, "BS20001"},
		Combined{"V3", 2, 5, "BS20001"},
		Combined{"V3", 2, 6, "BS20001"},
		Combined{"V4", 2, 5, "BS20001"},
		Combined{"V4", 2, 6, "BS20001"},
		Combined{"V1", 2, 7, "EV20001"},
		Combined{"V1", 2, 8, "EV20001"},
		Combined{"V2", 2, 7, "EV20001"},
		Combined{"V2", 2, 8, "EV20001"},
		Combined{"V3", 2, 7, "EV20001"},
		Combined{"V3", 2, 8, "EV20001"},
		Combined{"V4", 2, 7, "EV20001"},
		Combined{"V4", 2, 8, "EV20001"},
		Combined{"NC241", 4, 8, ""},
		Combined{"NR122", 3, 1, ""},
		Combined{"NR222", 3, 1, ""},
		Combined{"NR121", 3, 1, ""},
		Combined{"NR221", 3, 1, ""},
	}

	for _, p := range problems {
		_, ok := schedule[p.Room]
		if !ok {
			continue
		}

		if !(p.Day >= 0 && p.Day < 5) || !(p.Slot >= 0 && p.Slot < 9) {
			continue
		}

		schedule[p.Room][p.Day][p.Slot] = p.Value
	}

	b, err = json.Marshal(schedule)
	if err != nil {
		log.Fatal("Could not marshal schedule to JSON: ", err)
	}
	err = ioutil.WriteFile("schedule.json", b, 0644)
	if err != nil {
		log.Fatal("Could not write to schedule.json: ", err)
	}

	empty_schedule := chillz.BuildEmptySchedule(schedule)
	b, err = json.Marshal(empty_schedule)
	if err != nil {
		log.Fatal("Couldn't convert empty schedule to JSON: ", err)
	}
	err = ioutil.WriteFile("empty_schedule.json", b, 0644)
	if err != nil {
		log.Fatal("Couldn't write the empty schedule JSON to file: ", err)
	}
}
