/**
 * Created by praveen on 24.08.15.
 *
 * For functions related to the Professor tab
 */

angular.module('ContributeApp').factory('TeacherService', function($http) {
    var factory = {};
    factory.teachers = {};
    factory.listTeachers = function(){
            var req = {
                method: 'GET',
                url: 'https://course-stats.appspot.com/teacher/list'
            };
            $http(req)
                .then(
                function(response){ // Success callback
                    factory.teachers = response.data.teachers;
                },
                function(response){ //Error callback
                    console.log(response.toString());
                }
            );
        };

    createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(teacher) {
            var lowercaseName = angular.lowercase(teacher.name);
            return (lowercaseName.indexOf(lowercaseQuery) >= 0);
        };
    };

    factory.searchTeacher = function (query) {
        var results = query ? factory.teachers.filter(createFilterFor(query)) : [];
        return results;
    };

    return factory;
});

angular.module('ContributeApp').controller('TeacherCtrl', function($scope, $http, TeacherService, $cookies) {
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.message = {
        error: null,
        success: null
    };
    $scope.website = null;
    $scope.addingTeacher = 0;

    // Init teacher data
    TeacherService.listTeachers();

    $scope.searchTeacher = function(query){
      return TeacherService.searchTeacher(query);
    };

    $scope.addTeacher = function(){

        // Adding existing prof.
        if($scope.selectedItem){
            $scope.message.success = '';
            $scope.message.error = "Cannot add existing Professor";
            return;
        }

        // Adding existing prof.
        if(!$scope.searchText){
            $scope.message.success = '';
            $scope.message.error = "Name cannot be null";
            return;
        }

        // Website not null
        if(!$scope.website){
            $scope.message.success = '';
            $scope.message.error = "Website cannot be null";
            return;
        }

        // Now add
        $scope.message.success = '';
        $scope.message.error = '';
        $scope.addingTeacher = 1;
        var req = {
            method: 'GET',
            url: 'https://course-stats.appspot.com/teacher/add?'
            + 'token=' + $cookies.token
            + '&name=' + $scope.searchText
            + '&website=' + $scope.website
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
                    $scope.searchText = null;
                    $scope.website = null;
                    TeacherService.listTeachers();
                } else{
                    $scope.message.success = '';
                    $scope.message.error = $data.message;
                }
                $scope.addingTeacher = 0;
            },
            function(response){ //Error callback
                $scope.message.success = '';
                $scope.message.error = response.toString();
                $scope.addingTeacher = 0;
                console.log(response.toString());
            }
        );

    };

});

