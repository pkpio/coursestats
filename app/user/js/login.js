/**
 * Created by praveen on 17.09.15.
 */
angular.module('UserApp').controller('LoginCtrl', function ($scope, config, $http, $cookies, $location, md5) {

    // Login page function
    $scope.loginPage = {
        loggingin : 0,
        login : function() {

            if(!($scope.loginPage.email && $scope.loginPage.password))
                return;

            $scope.loginPage.loggingin = 1;

            // Build a login request
            var req = {
                method: 'GET',
                url: config.apiUrl + '/student/login?'
                + 'email=' + $scope.loginPage.email
                +'&password=' + md5.createHash($scope.loginPage.password)
            };

            // Send it
            $http(req)
                .then(
                function(response){ // Success callback
                    $data = response.data;
                    if($data.responsecode == 200){
                        // Save token as a cookie and redirect to lastUrl
                        $cookies.token = $data.token;
                        $cookies.email = $scope.loginPage.email;
                        $location.path(($cookies.lastUrl) ? $cookies.lastUrl : '');
                    } else{
                        $scope.loginPage.loginError = $data.message;
                    }
                    $scope.loginPage.loggingin = 0;
                },
                function(response){ //Error callback
                    $scope.loginPage.loginError = response.toString();
                }
            );
        }
    };

    $scope.toolbar = {
        getEmail : function(){
            return ($cookies.email) ? $cookies.email : '';
        },
        user : {
            getProfile : function(){
                return 'https://secure.gravatar.com/' + md5.createHash($scope.toolbar.getEmail());
            },
            getImage : function(){
                return 'https://secure.gravatar.com/avatar/' + md5.createHash($scope.toolbar.getEmail()) + '?d=mm';
            }

        },
        getLoginBtnText: function(){
            if($cookies.token)
                return 'logout';
            else
                return 'login';
        },
        loginToggle : function(){
            if($cookies.token) {
                $cookies.token = '';
                $cookies.email = '';
            } else{
                $cookies.lastUrl = $location.path();
                $location.path('/login');
            }
        }
    };

});