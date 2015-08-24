/**
 * Created by praveen on 21.08.15.
 */
var app = angular.module('ContributeApp', ['ngMaterial', 'ngCookies', 'ngMd5']);

angular.module('ContributeApp').controller('AppCtrl', function($scope, $mdDialog, $http, $cookies, md5, LoginService) {

    $scope.showLogin = function() {
        $mdDialog.show({
            controller: 'LoginCtrl',
            templateUrl: 'includes/loginDialog.html',
            parent: angular.element(document.body),
            targetEvent: document.body,
            clickOutsideToClose: false,
            escapeToClose: false
        })
    };

    $scope.isLoggedIn = function(){
      return LoginService.loggedin;
    };

    $scope.logout = function(){
        $cookies.token = '';
        LoginService.loggedin = 0;
        $scope.showLogin();
    };

    if(!$cookies.token)
        $scope.showLogin();
    else
        LoginService.loggedin = 1;
});

