package main

import "net/http"
import "net/url"
import "golang.org/x/net/html" 
import "strings"
import "log"
import "io/ioutil"
import "github.com/joho/godotenv"
import "os"

func dep_timetable(dep string) string {

    u, _ := url.Parse("https://erp.iitkgp.ernet.in/Acad/timetable_track.jsp")

    q := u.Query()
    q.Set("action", "second")
    q.Set("dept", dep)

    u.RawQuery = q.Encode()

	req, _ := http.NewRequest("POST", u.String(), nil)

    req.ParseForm()

    req.PostForm.Set("for_session", "2017-2018")
    req.PostForm.Set("for_semester", "SPRING")

	req.Header.Add("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

    req.Header.Add("Cookie", "JSESSIONID=" + os.Getenv("JSESSIONID"))

    client := &http.Client{}

    resp, err := client.Do(req)

    log.Printf("%+v", req)

    log.Print(resp)
    defer resp.Body.Close()
    body, err := ioutil.ReadAll(resp.Body)

    log.Print(string(body))

    log.Print(err)

    return string(body)
}

func main() {
    err := godotenv.Load()

    if err != nil {
        log.Print("Couldn't load env variables from .env")
    }

    departments := []string{
        "AE",
        // "AR",
        // "CS",
        // "ME",
    }

    // department_timetables := make(chan string)
    // for _, v := range departments {
        // department_timetables<-dep_timetable(v)
    // }

    // TODO: Handle out of order results (if reqd. Don't think it's required)
    for _, v := range departments {
        doc, err := html.Parse(strings.NewReader(dep_timetable(v)))
        if err != nil {
            log.Fatal("Parse error", err)
        }

        log.Printf("%+v - %v", doc, v)
    }

}
