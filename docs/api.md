<br/><br/>

Coursestats offers a public API. The list of API functions are documented below.

API baseurl: ```http://api.coursestats.de```

Student
-------
Groupurl: ```/student```<br/>
Functions:

1. Register<br/>
   Url - ```/register```<br/>
   Params - fullname, email, password (md5 of the actual password)<br/>
   Response - JSON object with responsecode:200 if successful

2. Login<br/>
   Url - ```/login```<br/>
   Params - email, password <br/>
   Response - token

<br/><br/>

Note: The actual url of a function would be baseurl + groupurl + functionurl. For example, register is at http://api.coursestats.de/student/register

<br/>

Note: API always responds in JSON with field responsecode: 200 when ever the request was successful.


Professor
-----------
Groupurl: ```/teacher```<br/>
Functions:

1. Add<br/>
   Url - ```/add```<br/>
   Params - name, website, token<br/>
   Response - teacherid

2. List<br/>
   Url - ```/list```<br/>
   Params - none<br/>
   Response - [teacher]

3. Search<br/>
   Url - ```/search```<br/>
   Params - teacherid<br/>
   Response - [teacher]


Course
-----------
Groupurl: ```/course```
Functions:<br/>

1. Add<br/>
   Url - ```/add```<br/>
   Params - name, year, semester, teacherid, token<br/>
   Response - courseid

2. List<br/>
   Url - ```/list```<br/>
   Params - none<br/>
   Response - [course]

3. Search<br/>
   Url - ```/search```<br/>
   Params - courseid<br/>
   Response - [course]


Grade
-----------
Groupurl: ```/grade```
Functions:<br/>

1. Add<br/>
   Url - ```/add```<br/>
   Params - courseid, teacherid, token, grade_10, grade_13.....grade_50, grade_others<br/>
   Response - gradeid

2. List<br/>
   Url - ```/list```<br/>
   Params - none<br/>
   Response - [grade]

3. Search<br/>
   Url - ```/search```<br/>
   Params - courseid or teacherid (a union search is performed)<br/>
   Response - [grade]


You are free to use it and develop applications for other platforms. Please do not abuse this service.
