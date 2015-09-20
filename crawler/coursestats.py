#!/usr/bin/env python
# Author: Praveen Kumar Pendyala
# Date  : 1.09.2015

import sys
import getpass
import re
import urllib
import mechanize
from bs4 import BeautifulSoup

## URLs
addgrade = "https://api.coursestats.de/grade/add/auto"
tucan = "https://www.tucan.tu-darmstadt.de"
login = tucan + "/scripts/mgrqcgi?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000344,-Awelcome"

## Initial note
print "\n\n"
print "\t\t Hello Contributor! \n\n"
print "The source code is available at https://github.com/praveendath92/coursestats"
print "Developer : Praveen Kumar Pendyala \n\n\n"

## How does it work?
print "How does it work?"
print "1. If you agree to support, this software can login to your TUCaN account."
print "2. This software looks in the examinations page to see the list of courses in your account."
print "3. This software opens the grading statistics for each course in the list"
print "4. This software sends ONLY the grading statistics (not your grade in a course) to coursestats backend"
print "5. Coursestats administrators manually verify this data and make them public for all students to search\n\n"
print "Now let's get you started!\n\n\n"

## Credentails
print "Please enter your TuCan credentials"
username = raw_input("Username: ")
password = getpass.getpass("Password: ")
token = "d83sU97sM3Y0rOtc3jtdvcVe"
addgrade = addgrade + "?token=" + token

## Configure browser
br = mechanize.Browser()

## Do login
print 'logging in..'
br.open(login)
br.select_form(nr=0)
br.form['usrname'] = username
br.form['pass'] = password
req = br.submit();

## Go to Examination
print 'Opening examinations page..'
br.follow_link(text_regex="Examinations", nr=0)

## Go to Semester results
print 'Getting Semster results..'
br.follow_link(text_regex="Semester Results", nr=0)

## Go to Examination results
print 'Fetching Examination results..'
resp = br.follow_link(text_regex="Examination Results", nr=0)
gpage = resp.geturl()
soup = BeautifulSoup(resp.read(), "html5lib")

## Get and open all sems option from choices
allsems = soup.find('option')
allGrades = gpage + '-N' + allsems['value']
br.open(allGrades)
print 'Iterating through course stats\n'

glinks = []
for link in br.links(text_regex="\xc3\x98"):
    glinks.append(link)

for link2 in glinks:
    soup = BeautifulSoup(br.follow_link(link2).read(), "html5lib")

    # Parse course name, year, sem and build url
    ctxt = soup.find('h2').text
    cname = ctxt[:ctxt.index(",")].strip()
    csem = 2
    if ctxt[ctxt.index(",")+2:ctxt.index("20")-1] == "SoSe":
        csem = 1 
    cyear = ctxt[ctxt.index("20"):ctxt.index("20")+4]
    tgurl = addgrade + "&" + urllib.urlencode({'cname' : cname}) + "&cyear=" + cyear + "&csem=" + str(csem)
    print cname

    # Tucan id parsing - Fails in Modules page
    title = soup.find('td', {'class':'tbdata'}).text # Module data (v2 specific)
    tucanid = title[title.index("offering")+9:title.index(cname)].strip()
    tgurl = tgurl + "&" + urllib.urlencode({'tucanid' : tucanid})

    grades = []
    for data in soup.find_all('td', {'class':'tbdata'}):
        g = data.text.strip()
        if g == "---":
            g = "0"
        grades.append(g)
    
    # Add each grade to url
    off = 2 # Offset in # tbdata tags before actual data. 2 for exams page, 1 for modules.
    try:
        tgurl = tgurl + "&grade10=" + str(grades[off]) + "&grade13=" + str(str(grades[off+1])) + "&grade17=" + str(grades[off+2])
        tgurl = tgurl + "&grade20=" + str(grades[off+3]) + "&grade23=" + str(str(grades[off+4])) + "&grade27=" + str(grades[off+5])
        tgurl = tgurl + "&grade30=" + str(grades[off+6]) + "&grade33=" + str(str(grades[off+7])) + "&grade37=" + str(grades[off+8])
        tgurl = tgurl + "&grade40=" + str(grades[off+9]) + "&grade50=" + str(str(grades[off+10])) + "&gradeothers=0"
        resp = br.open(tgurl)
        print resp.read() + "\n"
    except IndexError:
        print "Grades unavailable \n"

print "\n\n\tAll done! Thank you :)\n\n"
getpass.getpass("Press [ENTER] to exit")
