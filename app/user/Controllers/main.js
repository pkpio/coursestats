// script.js

    // create the module and name it app
        // also include ngRoute for all our routing needs
    var app = angular.module('app', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/courses.html',
                controller  : 'coursesController'
            })

            // route for the grades page
            .when('/grades', {
                templateUrl : 'pages/grades.html',
                controller  : 'gradesController'
            })

            // route for the teachers page
            .when('/teachers', {
                templateUrl : 'pages/teachers.html',
                controller  : 'teachersController'
            });
    });
