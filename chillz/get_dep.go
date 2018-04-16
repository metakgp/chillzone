package chillz

import "net/http"
import "net/url"
import "io/ioutil"
import "log"
import "os"

func FetchDepTimetable(dep Department) (string, error) {
	log.Print("Starting request for department ", dep.Code)
	u, err := url.Parse("https://erp.iitkgp.ernet.in/Acad/timetable_track.jsp")
	if err != nil {
		return "", err
	}
	q := u.Query()
	q.Set("action", "second")
	q.Set("dept", dep.Code)
	u.RawQuery = q.Encode()

	req, err := http.NewRequest("POST", u.String(), nil)
	if err != nil {
		return "", err
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Cookie", "JSESSIONID="+os.Getenv("JSESSIONID"))

	req.ParseForm()
	req.PostForm.Set("for_session", "2017-2018")
	req.PostForm.Set("for_semester", "SPRING")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	log.Printf("Request completed. Returning response now\n")

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}
