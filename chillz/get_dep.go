package chillz

import "net/http"
import "net/url"
import "io/ioutil"
import "log"
import "os"

func DepTimetable(dep string) string {

	log.Print("Starting request for department ", dep)

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

	req.Header.Add("Cookie", "JSESSIONID="+os.Getenv("JSESSIONID"))

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	log.Print("Request completed. Returning response now")

	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	return string(body)
}
