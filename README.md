# Chillzone

> Will find you a chillzone inside IIT KGP at any time

## Organization of the code

This repository serves as the data scraper. It will scrape data from the ERP
using the given credentials. After that, you must copy the following files into
`chill/src/`

1. `schedule.json`
1. `empty_schedule.json`
1. `subjectDetails.json`

The submodule "chill" is the frontend that will use these JSON files to generate
the static webpage. It is hosted on
[GitHub](https://github.com/icyflame/chillzone-frontend).

## Details

### Request

```sh
curl 'https://erp.iitkgp.ernet.in/Acad/timetable_track.jsp?action=second&dept=AE' \
    -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H 'Cookie: JSESSIONID=ABCD.worker3;' \
    --data 'for_session=2017-2018&for_semester=SPRING&dept=AE'
```

### Getting a valid `JSESSIONID`

1. Login to the ERP
1. Go to Academic -> Timetable -> Subject List with Timetable Slots
1. Open the browser console. Switch to the Network tab
1. Choose any department and wait for the time table to load
1. After the time table is loaded, check the Network tab for the `POST
   timetable_track.js ...` request. Select this request; switch to the Cookies
   tab and copy the `JSESSIONID` cookie value to your `.env` file

### Updation for a new semester

1. Get a valid `JSESSIONID`. Put this in the `.env` file (using `.env.template`
   as the base for this file)
1. Delete/Rename the `all_subjects.json` file if present
1. Delete the `first-year.csv` file. You need to populate this file manually
   using `first-year.csv.template` as a reference
1. Empty the `problems` array inside `main.go` (**TODO:** This should also be read
   from a file)
1. Run `go build && ./chillzone`. This will build and run the `main` function
   inside `main.go`
