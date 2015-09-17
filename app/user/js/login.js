/**
 * Created by praveen on 17.09.15.
 */
angular.module('UserApp').controller('LoginCtrl', function ($scope, config, $http, $cookies, md5) {
    $scope.loggingin = 0;

    $scope.login = function() {

        if(!($scope.email && $scope.password))
            return;

        $scope.loggingin = 1;

        // Build a login request
        var req = {
            method: 'GET',
            url: config.apiUrl + '/student/login?'
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
                    // -TODO- Redirect to prev url
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

});