package main

import (
	"encoding/json"
	"github.com/joho/godotenv"
	"io/ioutil"
	"log"
	"os"
	// "fmt"
)

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

	type Combined struct {
		Room  string
		Day   int
		Slot  int
		Value string
	}

	// Add the problems that were reported by users and incorporate them in the
	// schedule

	problems := []Combined{
		Combined{
			"NC233",
			0,
			8,
			"",
		},
		Combined{
			"NC233",
			3,
			8,
			"",
		},
		Combined{
			"V1",
			2,
			5,
			"BS20001",
		},
		Combined{
			"V1",
			2,
			6,
			"BS20001",
		},
		Combined{
			"V2",
			2,
			5,
			"BS20001",
		},
		Combined{
			"V2",
			2,
			6,
			"BS20001",
		},
		Combined{
			"V3",
			2,
			5,
			"BS20001",
		},
		Combined{
			"V3",
			2,
			6,
			"BS20001",
		},
		Combined{
			"V4",
			2,
			5,
			"BS20001",
		},
		Combined{
			"V4",
			2,
			6,
			"BS20001",
		},
		Combined{
			"V1",
			2,
			7,
			"EV20001",
		},
		Combined{
			"V1",
			2,
			8,
			"EV20001",
		},
		Combined{
			"V2",
			2,
			7,
			"EV20001",
		},
		Combined{
			"V2",
			2,
			8,
			"EV20001",
		},
		Combined{
			"V3",
			2,
			7,
			"EV20001",
		},
		Combined{
			"V3",
			2,
			8,
			"EV20001",
		},
		Combined{
			"V4",
			2,
			7,
			"EV20001",
		},
		Combined{
			"V4",
			2,
			8,
			"EV20001",
		},
	}

	for _, p := range problems {
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
