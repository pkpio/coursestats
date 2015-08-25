/**
 * Created by praveen on 25.08.15.
 */

angular.module('UserApp').controller('GradeCtrl', function($scope, $http, $location) {
    const TEACHER = 1;
    const COURSE = 2;

    $scope.mode = TEACHER;

    // Find out the mode and id
    var path = $location.path();
    if(path.indexOf('/course/') > -1)
        $scope.mode = COURSE;
    $scope.id = path.substr(path.lastIndexOf('/') + 1, path.length);
    $scope.grades = [];

    // Get grades
    var urloption = ($scope.mode == TEACHER) ? "teacherid" : "courseid";
    var req = {
        method: 'GET',
        url: 'https://course-stats.appspot.com/grade/search?' + urloption + '=' + $scope.id
    };
    $http(req)
        .then(
        function(response){ // Success callback
            $scope.grades = response.data.grades;
        },
        function(response){ //Error callback
            console.log(response.toString());
        }
    );
});
