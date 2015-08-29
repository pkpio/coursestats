Coursestats offers a public API with limitations. You are free to use it and develop applications for other platforms. Please do not abuse this service. The list of
API functions are documented below.

API baseurl: ```http://api.coursestats.de```

User
-------
Group Url: ```/user```

Functions
    - Register
        To register a new user. 
        Url - ```/register```
        Params - fullname, email, password (md5 of the actual password)
        Response - JSON object with ```responsecode: 200``` if successful

    - Login
        To login using credentials of a user.
        Url - ```/login```
        Params - email, password
        Response - JSON object with ```responsecode: 200, token: <token>``` if successful


Note: The actual url of a function would be baseurl + groupurl + functionurl. For example, register is at http://api.coursestats.de/user/register


Professor
-----------
Group Url: ```/teacher```

Functions
    - Add
        To add a new teacher.
        Url - ```/add```
        Params - name, website, token
        Response - JSON object with ```responsecode: 200, teacherid: <id-of-teacher>``` if successful

    - List
        Lists 50 teachers in the database
        Url - ```/list```
        Params - none
        Response - JSON object with ```responsecode: 200, teachers: <array-of-teacher-objects>``` if successful

    - Search
        Gives the top 10 results for a search query
        Url - ```/search```
        Params - teacherid
        Response - JSON object with ```responsecode: 200, teachers: <array-of-teacher-objects>``` if successful


Course
-----------
Group Url: ```/course```

Functions
    - Add
        To add a new course.
        Url - ```/add```
        Params - name, year, semester, teacherid, token
        Response - JSON object with ```responsecode: 200, courseid: <id-of-course>``` if successful

    - List
        Lists 50 courses in the database
        Url - ```/list```
        Params - none
        Response - JSON object with ```responsecode: 200, courses: <array-of-course-objects>``` if successful

    - Search
        Gives the top 10 results for a search query
        Url - ```/search```
        Params - courseid
        Response - JSON object with ```responsecode: 200, courses: <array-of-course-objects>>``` if successful


Grade
-----------
Group Url: ```/grade```

Functions
    - Add
        To add grades of a course.
        Url - ```/add```
        Params - courseid, teacherid, token, grade_10, grade_13, grade_17, grade_20, grade_23 ..... grade_40, grade_50, grade_others
        Response - JSON object with ```responsecode: 200, gradeid: <id-of-grade>``` if successful

    - List
        Lists 10 grades from the database. Almost never useful.
        Url - ```/list```
        Params - none
        Response - JSON object with ```responsecode: 200, grades: <array-of-grade-objects>``` if successful

    - Search
        Gives the top 10 results for a search query
        Url - ```/search```
        Params - courseid or teacherid (A union search is returned)
        Response - JSON object with ```responsecode: 200, courses: <array-of-grade-objects>>``` if successful


Feel free to contact us if you are facing issues with the API
