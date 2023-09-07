from subprocess import call

call("go build && ./other-years-scraper", cwd="other-years-scraper", shell=True)
call("python main.py", cwd="first-year-scraper", shell=True)

# a = input("do you want to open local frontend?(y/n): ")
# if(a=="y"):
#     call("npm start", cwd="frontend", shell=True)