/**
 * Created by praveen on 24.08.15.
 *
 * For functions related to site administration
 */
angular.module('AdminApp').controller('AdminCtrl', function($scope, config, $http, $cookies) {
    $scope.students = [];
    $scope.response = '';
    $scope.selected = null;
    $scope.listStudents = function(){
        console.log('Got it');
        var req = {
            method: 'GET',
            url: config.apiUrl + '/admin/list/inactive?token=' + $cookies.token
        };
        $scope.response = '';
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                if($data.responsecode==200)
                    $scope.students = $data.students;
                $scope.response = $data.message;
            },
            function(response){ //Error callback
                $scope.response = response.toString();
            }
        );
    };
    $scope.activate = function(studentid){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/admin/activate?token=' + $cookies.token
            + "&studentid=" + studentid
        };
        $scope.response = '';
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                console.log($data);
                if($data.responsecode == 200)
                    $scope.students = $data.students;
                $scope.response = $data.message;
            },
            function(response){ //Error callback
                $scope.response = response.toString();
            }
        );
    };

});

