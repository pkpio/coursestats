/**
 * Created by praveen on 22.08.15.
 *
 * Handles Login related operations and controls
 */


// For shared login state between controllers
angular.module('ContributeApp').factory('LoginService', function($mdDialog) {
    return {
        loggedin : 0
    };
});

angular.module('ContributeApp').controller('LoginCtrl', function ($scope, $mdDialog, $http, $cookies, md5, LoginService) {
    $scope.loggingin = 0;

    $scope.login = function() {

        if(!($scope.email && $scope.password))
            return;

        $scope.loggingin = 1;

        // Build a login request
        var req = {
            method: 'GET',
            url: 'https://course-stats.appspot.com/student/login?'
            + 'email=' + $scope.email
            +'&password=' + md5.createHash($scope.password)
        };

        // Send it
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                if($data.responsecode == 200){
                    // Save token as a cookie
                    $cookies.token = $data.token;
                    $scope.hide();
                    LoginService.loggedin = 1;
                } else{
                    $scope.loginError = $data.message;
                }
                $scope.loggingin = 0;
            },
            function(response){ //Error callback
                $scope.loginError = response.toString();
            }
        );
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };
});
