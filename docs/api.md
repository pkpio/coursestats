<br/><br/>

Coursestats offers a public API. The list of API functions are documented below.

API baseurl: ```http://api.coursestats.de```

User
-------
Groupurl: ```/user```<br/>
Functions:

1. Register<br/>
   Url - ```/register```<br/>
   Params - fullname, email, password (md5 of the actual password)<br/>
   Response - JSON object with ```responsecode: 200``` if successful

2. Login<br/>
   Url - ```/login```<br/>
   Params - email, password <br/>
   Response - JSON object with ```responsecode: 200, token: <token>``` if successful

<br/><br/>

Note: The actual url of a function would be baseurl + groupurl + functionurl. For example, register is at http://api.coursestats.de/user/register

<br/>



Professor
-----------
Groupurl: ```/teacher```
Functions:

1. Add<br/>
   Url - ```/add```<br/>
   Params - name, website, token<br/>
   Response - JSON object with ```responsecode: 200, teacherid: <id-of-teacher>``` if successful

2. List<br/>
   Url - ```/list```<br/>
   Params - none<br/>
   Response - JSON object with ```responsecode: 200, teachers: <array-of-teacher-objects>``` if successful

3. Search<br/>
   Url - ```/search```<br/>
   Params - teacherid<br/>
   Response - JSON object with ```responsecode: 200, teachers: <array-of-teacher-objects>``` if successful


Course
-----------
Groupurl: ```/course```
Functions:

1. Add<br/>
   Url - ```/add```<br/>
   Params - name, year, semester, teacherid, token<br/>
   Response - JSON object with ```responsecode: 200, courseid: <id-of-course>``` if successful

2. List<br/>
   Url - ```/list```<br/>
   Params - none<br/>
   Response - JSON object with ```responsecode: 200, courses: <array-of-course-objects>``` if successful

3. Search<br/>
   Url - ```/search```<br/>
   Params - courseid<br/>
   Response - JSON object with ```responsecode: 200, courses: <array-of-course-objects>``` if successful


Grade
-----------
Groupurl: ```/grade```
Functions:

1. Add<br/>
   Url - ```/add```<br/>
   Params - courseid, teacherid, token, grade_10, grade_13.....grade_50, grade_others<br/>
   Response - JSON object with ```responsecode: 200, gradeid: <id-of-grade>``` if successful

2. List<br/>
   Url - ```/list```<br/>
   Params - none<br/>
   Response - JSON object with ```responsecode: 200, grades: <array-of-grade-objects>``` if successful

3. Search<br/>
   Url - ```/search```<br/>
   Params - courseid or teacherid (a union search is performed)<br/>
   Response - JSON object with ```responsecode: 200, courses: <array-of-grade-objects>``` if successful


You are free to use it and develop applications for other platforms. Please do not abuse this service.
