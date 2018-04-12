package chillz

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
)

type Subject struct {
	Dep        Department  `json:"department"`
	Code       string      `json:"subject_code"`
	Name       string      `json:"subject_name"`
	Professors []Professor `json:"professors`
	LTP        string      `json:"ltp"` // TODO: Make this a struct
	Credits    string      `json:"credits"`
	Slot       string      `json:"slot"`
	Room       string      `json:"room"`
}

type Professor struct {
	Name string `json:"prof_name"`
}

func (s *Subject) IsValid() bool {
	return s.Dep.IsValid()
}

type Subjects []Subject

type Departments []Department

type Department struct {
	Code string `json:"code"`
}

func (d *Department) IsValid() bool {
	return len(d.Code) == 2 // TODO: This check is rather primitive.
}

func GetDepartments(filename string) (Departments, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return Departments{}, err
	}

	var departments Departments
	err = json.Unmarshal(data, &departments)
	if err != nil {
		return Departments{}, err
	}
	return departments, nil
}

func GetDepartmentSubjects(dep Department) (Subjects, error) {
	depTimetable, err := FetchDepTimetable(dep)
	// TODO: Research whether to return `nil` or zero `Subjects` value.
	if err != nil {
		e := fmt.Errorf("Cannot fetch subjects for department %s\n", dep.Code)
		return Subjects{}, e
	}
	subjects, err := ParseHtml(dep, depTimetable)
	if err != nil {
		e := fmt.Errorf("Cannot parse the response for department %s\n", dep.Code)
		return Subjects{}, e
	}
	return subjects, nil
}

func GetDepartmentSubjectsWorker(dep Department, deptSubjectsChan chan Subjects) {
	log.Printf("goroutine for department %s\n", dep.Code)
	deptSubjects, err := GetDepartmentSubjects(dep)
	if err != nil {
		log.Println(err)
		deptSubjects = Subjects{}
	} else {
		log.Printf("Fetch completed for department %s with %d subjects\n",
			dep.Code, len(deptSubjects))
	}
	deptSubjectsChan <- deptSubjects
}

func GetFirstYearSubjects(filename string) (Subjects, error) {
	allFirstYearSubjects := Subjects{}

	f, err := os.Open(filename)
	if err != nil {
		return allFirstYearSubjects, err
	}
	defer f.Close()

	r := csv.NewReader(f)
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return allFirstYearSubjects, err
		}
		newSubject := Subject{
			Dep: Department{
				Code: record[0],
			},
			Code:    record[1],
			Name:    record[2],
			LTP:     record[4],
			Credits: record[5],
			Room:    record[6],
		}
		allFirstYearSubjects = append(allFirstYearSubjects, newSubject)
	}
	return allFirstYearSubjects, nil
}

func GetAllDepartmentSubjects(filename string, departments Departments) (Subjects, error) {
	allSubjects := Subjects{}

	if _, err := os.Stat(filename); os.IsNotExist(err) {
		deptSubjectsChan := make(chan Subjects)
		for _, dep := range departments {
			log.Print("Fetching subjects for department ", dep.Code)
			go GetDepartmentSubjectsWorker(dep, deptSubjectsChan)
		}

		for i := 0; i < len(departments); i++ {
			deptSubjects := <-deptSubjectsChan
			// TODO: Efficient way to add a slice of user-defined values to another
			// Similar to Python's extend function
			for _, deptSubject := range deptSubjects {
				allSubjects = append(allSubjects, deptSubject)
			}
		}

		b, err := json.Marshal(allSubjects)
		if err != nil {
			b = []byte("")
		}

		err = ioutil.WriteFile(filename, b, 0644)
		if err != nil {
			log.Printf("Could not write subjects.json to file: %v", err)
		}
	} else {
		b, err := ioutil.ReadFile(filename)
		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(b, &allSubjects)
		if err != nil {
			log.Fatal(err)
		}
	}

	return allSubjects, nil
}
