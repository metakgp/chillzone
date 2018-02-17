# Chillzone

> Will find you a chillzone inside IIT KGP at any time

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
