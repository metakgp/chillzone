package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/metakgp/chillzone/chillz"
	// "fmt"
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

type Departments struct {
	Departments []Department `json:"departments"`
}

type Department struct {
	Code string `json:"code"`
}

func GetDepartments(filename string) ([]Department, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var departments Departments
	err = json.Unmarshal(data, &departments)
	if err != nil {
		return nil, err
	}
	return departments.Departments, nil
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

	// departments, err := GetDepartments("departments.json")
	// if err != nil {
	// 	log.Println("Unable to load departments:", err)
	// }

	allSubjects := make(map[string][][]string)

	_, err = os.Stat("all_subjects.json")
	no_file := err != nil

	if no_file {

		accumulate_channel := make(chan ParsedResult)

		for _, v := range departments {
			dep := v
			go func() {
				t := chillz.ParseHtml(chillz.DepTimetable(dep))
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

	b, err := ioutil.ReadFile("first-year.csv.4")
	if err != nil {
		log.Fatal(err)
	}

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

	transformedMap := chillz.ChangeMapStructure(allSubjects)
	log.Print(transformedMap)

	b, err = json.Marshal(transformedMap)
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
