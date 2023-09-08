<div id="top"></div>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Wiki][wiki-shield]][wiki-url]
<!-- [![MIT License][license-shield]][license-url] -->

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/metakgp/chillzone">
    <img width="140" alt="image" src="images/icons/icon_384x384.png">
  </a>

  <h1 align="center">Chillzone</h1>

  <p align="center">
    <i>Will find you a chillzone inside IIT KGP at any time</i>
    <br />
    <a href="https://github.com/metakgp/chillzone/issues">Report Bug</a>
    ·
    <a href="https://github.com/metakgp/chillzone/issues">Request Feature</a>
  </p>
</div>

<details>
<summary>Table of Contents</summary>

- [Usage(Local Installation)](#usagelocal-installation)
- [Updation for a new semester](#updation-for-a-new-semester)
  - [Getting a valid `JSESSIONID`](#getting-a-valid-jsessionid)
  - [Updating `.env` file](#updating-env-file)
  - [For First Year Timetable](#for-first-year-timetable)
  - [Final steps](#final-steps)
- [Meanings of the various files](#meanings-of-the-various-files)
  - [Input Files](#input-files)
  - [Output Files](#output-files)
- [Maintainers](#maintainers)
- [Contact](#contact)
</details>

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

<!-- 
## How does it work?

### Request

```sh
curl 'https://erp.iitkgp.ernet.in/Acad/timetable_track.jsp?action=second&dept=AE' \
    -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H 'Cookie: JSESSIONID=ABCD.worker3;' \
    --data 'for_session=2017-2018&for_semester=SPRING&dept=AE'
``` -->


## Updation for a new semester

### Getting a valid `JSESSIONID`

1. Login to the ERP
2. Go to Academic -> Timetable -> Subject List with Timetable Slots
3. Open the browser console. Switch to the Network tab
4. Choose any department and wait for the time table to load
5. After the time table is loaded, check the Network tab for the `POST timetable_track.js ...` request. Select this request; switch to the Cookies tab and copy the `JSESSIONID` cookie value.
  
### Updating `.env` file

> **Note**: Use `.env.template` file as the base for `.env` file

1. Update the `JSESSIONID` environment variable with the copied value.
2. Update the `SESSION` and `SEMESTER` environment variables.

> **Note:** In case you are unable to scrape the new semester's timetable, then, these steps will help you find the problem:
> 1. Turn on `DEBUG` inside the `.env` file by setting it to `"1"`
> 2. Reduce the size of the departments array to 2 so that you are not buried with output in the terminal.

### For First Year Timetable

> **Note**: First year timetable needs to be updated at the start of a new session only.

Download first year timetable from ERP and place it in the `first-year-scraper/` directory.

### Final steps

1. Empty the `problems` array inside `main.go` 
2. Run `chillzone.py`

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

## Maintainers

Shivam Kumar Jha`<br/>`
@thealphadollar on GitHub and Metakgp Slack

## Contact

<p>
📫 Metakgp -
<a href="https://bit.ly/metakgp-slack">
  <img align="center" alt="Metakgp's slack invite" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/slack.svg" />
</a>
<a href="mailto:metakgp@gmail.com">
  <img align="center" alt="Metakgp's email " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/gmail.svg" />
</a>
<a href="https://www.facebook.com/metakgp">
  <img align="center" alt="metakgp's Facebook" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/facebook.svg" />
</a>
<a href="https://www.linkedin.com/company/metakgp-org/">
  <img align="center" alt="metakgp's LinkedIn" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/linkedin.svg" />
</a>
<a href="https://twitter.com/metakgp">
  <img align="center" alt="metakgp's Twitter " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/twitter.svg" />
</a>
<a href="https://www.instagram.com/metakgp_/">
  <img align="center" alt="metakgp's Instagram" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/instagram.svg" />
</a>
</p>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/metakgp/chillzone.svg?style=for-the-badge
[contributors-url]: https://github.com/metakgp/chillzone/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/metakgp/chillzone.svg?style=for-the-badge
[forks-url]: https://github.com/metakgp/chillzone/network/members
[stars-shield]: https://img.shields.io/github/stars/metakgp/chillzone.svg?style=for-the-badge
[stars-url]: https://github.com/metakgp/chillzone/stargazers
[issues-shield]: https://img.shields.io/github/issues/metakgp/chillzone.svg?style=for-the-badge
[issues-url]: https://github.com/metakgp/chillzone/issues
<!-- [license-shield]: https://img.shields.io/github/license/metakgp/chillzone.svg?style=for-the-badge -->
[wiki-shield]: https://custom-icon-badges.demolab.com/badge/metakgp_wiki-grey?logo=metakgp_logo&logoColor=white&style=for-the-badge
[wiki-url]: https://wiki.metakgp.org
