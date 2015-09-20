/**
 * Created by praveen on 24.08.15.
 *
 * For functions related to site administration
 */
angular.module('AdminApp').controller('GradeCtrl', function($scope, config, $http, $cookies) {
    $scope.grades = [];
    $scope.response = '';
    $scope.select = {
        value: null,
        grade: null,
        changeSelect : function(){
            for(i=0; i<$scope.grades.length; i++){
                if($scope.grades[i].gradeid == $scope.select.value){
                    $scope.select.grade = $scope.grades[i];
                    break;
                }
            }
        }
    };

    $scope.listAutoGrades = function(){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/admin/grade/list/unverified?token=' + $cookies.token
        };
        $scope.response = '';
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                if($data.responsecode==200)
                    $scope.grades = $data.autogrades;
                $scope.response = $data.message;
            },
            function(response){ //Error callback
                $scope.response = response.toString();
            }
        );
    };

    $scope.verify = function(gradeid){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/admin/grade/verify?token=' + $cookies.token
            + "&gradeid=" + gradeid
        };
        console.log(req.url);
        $scope.response = '';
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                $scope.response = $data.message;

                $scope.listAutoGrades();
                $scope.select.value = null;
                $scope.select.grade = null;
            },
            function(response){ //Error callback
                $scope.response = response.toString();
            }
        );
    };

    $scope.addCourse = function(){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/course/add?'
            + 'token=' + $cookies.token
            + '&name=' + $scope.select.grade.coursename
            + '&year=' + $scope.select.grade.courseyear
            + '&sem=' + $scope.select.grade.coursesem
            + '&tucanid=' + $scope.select.grade.tucanid
            + '&teacherid=' + $scope.teacherid
        };
        console.log(req.url);
        $scope.response = '';
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                $scope.response = $data.message;
                if($data.responsecode == 200)
                    $scope.courseid = $data.courseid;
            },
            function(response){ //Error callback
                $scope.response = response.toString();
            }
        );
    };

    $scope.addGrades = function(){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/grade/add?'
            + 'token=' + $cookies.token
            + '&courseid=' + $scope.courseid
            + '&teacherid=' + $scope.teacherid
            + '&grade10=' + $scope.select.grade.grade_10
            + '&grade13=' + $scope.select.grade.grade_13
            + '&grade17=' + $scope.select.grade.grade_17
            + '&grade20=' + $scope.select.grade.grade_20
            + '&grade23=' + $scope.select.grade.grade_23
            + '&grade27=' + $scope.select.grade.grade_27
            + '&grade30=' + $scope.select.grade.grade_30
            + '&grade33=' + $scope.select.grade.grade_33
            + '&grade37=' + $scope.select.grade.grade_37
            + '&grade40=' + $scope.select.grade.grade_40
            + '&grade50=' + $scope.select.grade.grade_50
            + '&gradeothers=0'
        };
        console.log(req.url);
        $scope.response = '';
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                $scope.response = $data.message;
            },
            function(response){ //Error callback
                $scope.response = response.toString();
            }
        );
    };

});

