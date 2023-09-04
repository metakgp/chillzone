# Chillzone

> Will find you a chillzone inside IIT KGP at any time

## Usage(Local Installation)

To run Chillzone front-end on your local system 

1. Make sure you have `npm` installed on your system.
2. Clone the repo and change directory

   ```
   git clone https://github.com/metakgp/chillzone
   
   cd chillzone/frontend
   ```
3. Install modules and launch frontend
    ```
    npm install
    npm start
    ```

## TOC

- [Chillzone](#chillzone)
  - [Usage(Local Installation)](#usagelocal-installation)
  - [TOC](#toc)
  - [Organization of the code](#organization-of-the-code)
  - [How does it work?](#how-does-it-work)
    - [Request](#request)
    - [Getting a valid `JSESSIONID`](#getting-a-valid-jsessionid)
    - [Updation for a new semester](#updation-for-a-new-semester)
  - [Meanings of the various files](#meanings-of-the-various-files)
    - [Input Files](#input-files)
    - [Output Files](#output-files)
  - [Maintainer](#maintainer)

## Organization of the code

This repository serves as the data scraper. It will scrape data from the ERP
using the given credentials. After that, you must copy the following files into
`chill/src/`

1. `schedule.json`
2. `empty_schedule.json`
3. `subjectDetails.json`

The submodule "chill" is the frontend that will use these JSON files to generate
the static webpage. It is hosted on
[GitHub](https://github.com/icyflame/chillzone-frontend).

## How does it work?

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
2. Go to Academic -> Timetable -> Subject List with Timetable Slots
3. Open the browser console. Switch to the Network tab
4. Choose any department and wait for the time table to load
5. After the time table is loaded, check the Network tab for the `POST timetable_track.js ...` request. Select this request; switch to the Cookies
   tab and copy the `JSESSIONID` cookie value to your `.env` file

### Updation for a new semester

1. Get a valid `JSESSIONID`. Put this in the `.env` file (using `.env.template`
   as the base for this file)
2. Update the `SESSION` and `SEMESTER` environment variables
3. Delete the `all_subjects.json` file
4. Delete the `first-year.csv` file. You need to populate this file manually
   using `first-year.csv.template` as a reference
5. Empty the `problems` array inside `main.go`
6. Run `go build && ./chillzone`. This will build and run the `main` function
   inside `main.go`

**Note:** In case you are unable to scrape the new semester's timetable, then,
these steps will help you find the problem:

1. Turn on `DEBUG` inside the `.env` by setting it to `"1"`
2. Reduce the size of the departments array to 2 so that you are not buried with
   output in the terminal

## Meanings of the various files

### Input Files

- `problems.json`

  JSON file that stores problems reported by users. Sometimes, the ERP might
  show that course A is scheduled to be held in room B, but later, due to
  (say) too many students, the course might be moved to a bigger room C. Then,
  a few nodes can be added to the JSON file without touching other files and
  the schedule can be regenerated.
- `first-year.csv`

  The first year timetable is not available by default on ERP, so we need to
  add it manually using the central timetable PDF. This CSV file will be taken
  into consideration when the schedule is constructed. Refer to the template
  for details.

### Output Files

- `schedule.json`

  This is JSON file whose keys are the names of the rooms. Each value is a
  matrix with 5 rows and 9 columns. Each element in the matrix is the subject
  code of the class that will be held in that room during that one-hour slot.
  This string can be empty to show that the room will remain empty.
- `empty_schedule.json`

  This is a JSON file that stores a matrix with 5 rows and 9 columns. Each
  element of the matrix is a list of strings containing the list of rooms that
  are free during that one hour slot.
- `subjectDetails.json`

  This JSON file is used to show the tooltip with the name of the course and
  the name of the professors on top of the timetable entry in the chillzone
  webpage. It is a JSON file where the keys are subject codes and the values are
  strings with this structure: `<SUBJECT NAME> - <PROFESSOR NAMES>`.

## Maintainer

Shivam Kumar Jha`<br/>`
@thealphadollar on GitHub and Metakgp Slack
