package main

import (
	"encoding/json"
	"fmt"
	"github.com/joho/godotenv"
	"io/ioutil"
	"log"
	"os"
	"strings"
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

	departments := []string{
		"AE",
		"AG",
		"AR",
		"AT",
		"BE",
		"BM",
		"BS",
		"BT",
		"CD",
		"CE",
		"CH",
		"CL",
		"CR",
		"CS",
		"CY",
		"DE",
		"EC",
		"EE",
		"EF",
		"ES",
		"ET",
		"GG",
		"GS",
		"HS",
		"ID",
		"IM",
		"IP",
		"IT",
		"MA",
		"ME",
		"MI",
		"MM",
		"MS",
		"MT",
		"NA",
		"NT",
		"PH",
		"RD",
		"RE",
		"RJ",
		"RT",
		"RX",
		"SL",
		"TS",
		"WM",
	}

	allSubjects := make(map[string][][]string)

	_, err = os.Stat("all_subjects.json")
	no_file := err != nil

	if no_file {

		accumulate_channel := make(chan ParsedResult)

		for _, v := range departments {
			dep := v
			go func() {
				dep_html := dep_timetable(dep)
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

	b, err := ioutil.ReadFile("first-year.csv")
	first_years_exist := err == nil
	if first_years_exist {

		first_year_subs := strings.Split(string(b), "\n")
		for _, sub := range first_year_subs {
			comps := strings.Split(sub, ",")
			dep := string(comps[0])
			sub_details := comps[1:]
			if len(dep) != 2 {
				continue
			}

			allSubjects[dep] = append(allSubjects[dep], sub_details)
		}
	} else {
		log.Printf("WARNING: First year timetable not taken into consideration")
	}

	transformedMap := change_map_structure(allSubjects)

	b, err = json.Marshal(transformedMap)
	if err != nil {
		log.Fatal("Could not marshal subjectDetails to JSON: ", err)
	}

	subjectDetails := build_subject_details(transformedMap)
	b, err = json.Marshal(subjectDetails)
	if err != nil {
		log.Fatal("Could not marshal subjectDetails to JSON: ", err)
	}
	err = ioutil.WriteFile("subjectDetails.json", b, 0644)
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
		b, err = ioutil.ReadFile("problems.json")
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

	b, err = json.Marshal(schedule)
	if err != nil {
		log.Fatal("Could not marshal schedule to JSON: ", err)
	}
	err = ioutil.WriteFile("schedule.json", b, 0644)
	if err != nil {
		log.Fatal("Could not write to schedule.json: ", err)
	}

	empty_schedule := build_empty_schedule(schedule)
	b, err = json.Marshal(empty_schedule)
	if err != nil {
		log.Fatal("Couldn't convert empty schedule to JSON: ", err)
	}
	err = ioutil.WriteFile("empty_schedule.json", b, 0644)
	if err != nil {
		log.Fatal("Couldn't write the empty schedule JSON to file: ", err)
	}
}
