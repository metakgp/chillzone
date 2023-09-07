package main

import "net/http"
import "net/http/httputil"
import "net/url"
import "io/ioutil"
import "log"
import "os"
import "fmt"

func dep_timetable(dep string) string {

	log.Print("Starting request for department ", dep)

	u, _ := url.Parse("https://erp.iitkgp.ac.in/Acad/timetable_track.jsp")

	q := u.Query()
	q.Set("action", "second")
	q.Set("dept", dep)

	u.RawQuery = q.Encode()

	req, _ := http.NewRequest("POST", u.String(), nil)

	req.ParseForm()

	req.PostForm.Set("for_session", os.Getenv("SESSION"))
	req.PostForm.Set("for_semester", os.Getenv("SEMESTER"))
	req.PostForm.Set("dept", dep)

	req.Header.Add("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	req.Header.Add("Cookie", "JSESSIONID="+os.Getenv("JSESSIONID"))

	client := &http.Client{}

	if InDebugMode() {
		requestDump, err := httputil.DumpRequest(req, true)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(string(requestDump))
	}

	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	log.Printf("Request completed. Returning response now. Response length: %d", len(string(body)))

	return string(body)
}
