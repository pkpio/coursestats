#!/usr/bin/env python
# Author: Praveen Kumar Pendyala
# Date  : 1.09.2015

import sys
import getpass
import re
import mechanize
from bs4 import BeautifulSoup

## URLs
tucan = "https://www.tucan.tu-darmstadt.de";
login = tucan + "/scripts/mgrqcgi?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000344,-Awelcome";

## Credentails
print "Please enter your TuCan credentials"
username = raw_input("Username: ")
password = getpass.getpass("Password: ")
token = raw_input("Coursestats API token: ")

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

## Go to Module results
print 'Towards module results..'
resp = br.follow_link(text_regex="Module Results", nr=0)
gpage = resp.geturl()

## Get available sems list and save urls to each results page
sems = []
soup = BeautifulSoup(resp.read(), "html5lib")
for sem in soup.find_all('option'):
    sems.append(gpage + '-N' + sem['value'])
print 'Found ' + str(len(sems)) + ' semsters'

## Go to each stats 
i = len(sems)
for sempge in sems:
    print 'Fetching grades for sem ' + str(i)
    i = i-1
    br.open(sempge)
    
    print 'Iterating through course stats'
    glinks = []
    for link in br.links(text_regex="\xc3\x98"):
        glinks.append(link)

    for link2 in glinks:
        soup = BeautifulSoup(br.follow_link(link2).read(), "html5lib")

        # Parse course name and sem
        ctxt = soup.find('h2').text
        cname = ctxt[:ctxt.index(",")].strip()
        csem = 2
        if ctxt[ctxt.index(",")+2:ctxt.index("20")-1] == "SoSe":
            csem = 1 
        cyear = ctxt[ctxt.index("20"):ctxt.index("20")+4]
        print cname
        print str(csem)
        print cyear

        for data in soup.find_all('td', {'class':'tbdata'}):
            print data.text.strip()
