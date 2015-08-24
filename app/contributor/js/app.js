/**
 * Created by praveen on 21.08.15.
 */
var app = angular.module('ContributeApp', ['ngMaterial', 'ngCookies', 'ngMd5']);

angular.module('ContributeApp').controller('AppCtrl', function($scope, $mdDialog, $http, $cookies, md5, LoginService) {

    $scope.showLogin = function(ev) {
        $mdDialog.show({
            controller: 'LoginCtrl',
            templateUrl: 'loginDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
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
        $scope.showLogin(document.body);
    };

    if(!$cookies.token)
        $scope.showLogin(document.body);
    else
        LoginService.loggedin = 1;
});

