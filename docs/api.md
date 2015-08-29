Coursestats offers a public API with limitations. You are free to use it and develop applications for other platforms. Please do not abuse this service. The list of
API functions are documented below.

API baseurl : http://api.coursestats.de

User - /user
-------
- /register
- /login

Professor - /teacher
--------
- /add
- /list
- /search

Course - /course
-----------
- /add
- /list
- /search

Grade - /grade
-----------
- /add
- /list
- /search

Any endpoint which adds data, except register, would require a ```token``` as an additional parameter.
