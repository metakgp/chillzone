from subprocess import call

call("go build && ./other-years-scraper", cwd="other-years-scraper", shell=True)
call("python main.py", cwd="first-year-scraper", shell=True)