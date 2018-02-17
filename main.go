package main

import (
    "log"
    "github.com/joho/godotenv"
)
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
	}

    type ParsedResult struct{
        Subjects [][]string
        Department string
    }

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
        some_val := <-accumulate_channel
        log.Printf("Fetch completed for department %s with %d subjects", some_val.Department, len(some_val.Subjects))
    }
}
