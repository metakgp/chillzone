package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	erp "github.com/metakgp/iitkgp-erp-login-go"
)

func add_subject(
	dep, code, name, profs, ltp, creds, slot, room string,
	subs map[string][][]string,
) map[string][][]string {
	if len(dep) != 2 {
		return subs
	}

	this_sub_props := []string{}
	this_sub_props = append(this_sub_props, code)
	this_sub_props = append(this_sub_props, name)
	this_sub_props = append(this_sub_props, profs)
	this_sub_props = append(this_sub_props, ltp)
	this_sub_props = append(this_sub_props, creds)
	this_sub_props = append(this_sub_props, slot)
	this_sub_props = append(this_sub_props, room)

	subs[dep] = append(subs[dep], this_sub_props)

	return subs
}

type ParsedResult struct {
	Subjects   [][]string
	Department string
}

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Print("Couldn't load env variables from .env")
	}

	departments, err := GetDepartments("departments.json")
	if err != nil {
		log.Fatal("Couldn't read department data: ", err)
	}

	allSubjects := make(map[string][][]string)

	accumulate_channel := make(chan ParsedResult)

	log.Println("ERP Authentication is needed to fetch timetables!")
	client, _ := erp.ERPSession()

	for _, v := range departments {
		dep := v.Code
		go func() {
			dep_html := dep_timetable(dep, client)
			t := parse_html(dep_html)
			log.Printf("Found %d subjects in department %s", len(t), dep)
			accumulate_channel <- ParsedResult{t, dep}

			if len(t) == 0 && InDebugMode() {
				log.Fatal(fmt.Errorf("0 SUBJECTS FOUND.\nHTML OUTPUT: %s", dep_html))
			}

		}()
	}

	for i := 0; i < len(departments); i++ {
		dep_val := <-accumulate_channel
		log.Printf("Fetch completed for department %s with %d subjects",
			dep_val.Department,
			len(dep_val.Subjects))

		allSubjects[dep_val.Department] = dep_val.Subjects
	}

	transformedMap := change_map_structure(allSubjects)

	b, err := json.Marshal(transformedMap)
	if err != nil {
		log.Fatal("Could not marshal subjectDetails to JSON: ", err)
	}

	subjectDetails := build_subject_details(transformedMap)
	b, err = json.MarshalIndent(subjectDetails, "", "  ")
	if err != nil {
		log.Fatal("Could not marshal subjectDetails to JSON: ", err)
	}
	err = os.WriteFile("../frontend/src/data/subjectDetails.json", b, 0644)
	if err != nil {
		log.Fatal("Could not write to subjectDetails.json: ", err)
	}

	schedule := build_room_schedule(transformedMap)

	type Combined struct {
		Room  string
		Day   int
		Slot  int
		Value string
	}

	// Add the problems that were reported by users and incorporate them in the
	// schedule

	problems := []Combined{}
	_, err = os.Stat("problems.json")
	if err == nil {
		b, err = os.ReadFile("problems.json")
		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(b, &problems)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Print("Problems: ", problems)

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

	b, err = json.MarshalIndent(schedule, "", "  ")
	if err != nil {
		log.Fatal("Could not marshal schedule to JSON: ", err)
	}
	err = os.WriteFile("../frontend/src/data/schedule.json", b, 0644)
	if err != nil {
		log.Fatal("Could not write to schedule.json: ", err)
	}

	empty_schedule := build_empty_schedule(schedule)
	b, err = json.MarshalIndent(empty_schedule, "", "  ")
	if err != nil {
		log.Fatal("Couldn't convert empty schedule to JSON: ", err)
	}
	err = os.WriteFile("../frontend/src/data/empty_schedule.json", b, 0644)
	if err != nil {
		log.Fatal("Couldn't write the empty schedule JSON to file: ", err)
	}
}
