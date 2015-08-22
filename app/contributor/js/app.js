/**
 * Created by praveen on 21.08.15.
 */
var app = angular.module('ContributeApp', ['ngMaterial', 'ngCookies', 'ngMd5']);

app.controller('AppCtrl', function($scope, $mdDialog, $http, $cookies, md5) {

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: LoginController,
            templateUrl: 'loginDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            escapeToClose: false
        })
    };

    function LoginController($scope, $mdDialog, $http, $cookies, md5) {
        $scope.loggingin = 0;

        $scope.login = function() {
            if($scope.email && $scope.password){
                $scope.loggingin = 1;

                // Make a login request
                var req = {
                    method: 'GET',
                    url: 'https://course-stats.appspot.com/student/login?'
                    + 'email=' + $scope.email
                    +'&password=' + md5.createHash($scope.password)
                };

                // send it
                $http(req)
                    .then(
                    function(response){ // Success callback
                        $data = response.data;
                        if($data.responsecode == 200){
                            // Save token as a cookie
                            $cookies.token = $data.token;
                            $scope.hide();
                        }

                        else{
                            $scope.loggingin = 0;
                        }
                    },
                    function(response){ //Error callback
                        console.log(response.data);
                    }
                );
            }
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };
    };

    if(!$cookies.token)
        $scope.showAdvanced(document.body);
});
