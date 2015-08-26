/**
 * Created by praveen on 24.08.15.
 *
 * For functions related to course tab
 */
angular.module('ContributeApp').factory('CourseService', function(config, $http) {
    var factory = {};
    factory.courses = {};
    factory.listCourses = function(){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/course/list'
        };
        $http(req)
            .then(
            function(response){ // Success callback
                factory.courses = response.data.courses;
            },
            function(response){ //Error callback
                console.log(response.toString());
            }
        );
    };

    createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(course) {
            var lowercaseName = angular.lowercase(course.name);
            return (lowercaseName.indexOf(lowercaseQuery) >= 0);
        };
    };

    factory.searchCourse = function (query) {
        var results = query ? factory.courses.filter(createFilterFor(query)) : [];
        return results;
    };

    factory.checkDuplicate = function(name, year, semester){
        duplicate = false;
        angular.forEach(factory.courses, function (course) {
            if(!duplicate && course.name == name && course.year == year && course.semester == semester)
                duplicate = true;
        });
        return duplicate;
    };

    return factory;
});

angular.module('ContributeApp').controller('CourseCtrl', function($scope, config, $http, $cookies, CourseService, TeacherService) {
    $scope.message = {
        error: null,
        success: null
    };
    $scope.addingCourse = 0;

    //Init course data
    CourseService.listCourses();

    // Course object
    $scope.course = {
        selectedItem: null,
        searchText: null,
        year: {
            selected: "2015",
            options:[
                "2015", "2014", "2013", "2012", "2011", "2010"
            ]
        },
        sem: {
            selected: 1,
            options:[
                {
                    name: 'Summer',
                    value:1
                }, {
                    name: 'Winter',
                    value:2
                }
            ]
        },
        searchCourse: function (query) {
            return CourseService.searchCourse(query);
        }
    };

    // Teacher object
    $scope.teacher = {
        selectedItem: null,
        searchText: null,
        searchTeacher: function (query) {
            return TeacherService.searchTeacher(query);
        }
    };

    $scope.addCourse = function () {

        // Not an existing course
        if(CourseService.checkDuplicate($scope.course.searchText, $scope.course.year.selected,
                $scope.course.sem.selected)){
            $scope.message.success = '';
            $scope.message.error = "Cannot add existing course";
            return;
        }

        // Need an existing prof.
        if(!$scope.teacher.selectedItem){
            $scope.message.success = '';
            $scope.message.error = "Please select a Professor from list";
            return;
        }

        // Now add
        $scope.message.success = '';
        $scope.message.error = '';
        $scope.addingCourse = 1;
        var req = {
            method: 'GET',
            url: config.apiUrl + '/course/add?'
            + 'token=' + $cookies.token
            + '&name=' + $scope.course.searchText
            + '&year=' + $scope.course.year.selected
            + '&sem=' + $scope.course.sem.selected
            + '&teacherid=' + $scope.teacher.selectedItem.teacherid
        };
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                if($data.responsecode == 200){
                    console.log($data);
                    $scope.message.success = 'Add successful!';
                    $scope.message.error = '';

                    // Reset fields & refresh list
                    $scope.course.searchText = null;
                    $scope.teacher.searchText = null;
                    CourseService.listCourses();
                } else{
                    $scope.message.success = '';
                    $scope.message.error = $data.message;
                }
                $scope.addingCourse = 0;
            },
            function(response){ //Error callback
                $scope.message.success = '';
                $scope.message.error = response.toString();
                $scope.addingCourse = 0;
                console.log(response.toString());
            }
        );

    };

});