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

});

