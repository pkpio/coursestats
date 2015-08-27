/**
 * Created by praveen on 21.08.15.
 */
angular.module('AdminApp', ['ngMaterial', 'ngCookies', 'ngMd5'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('blue');
});

angular.module('AdminApp').constant('config', {
    apiUrl: 'http://api.course-stats.pkp.io'
});

angular.module('AdminApp').controller('AppCtrl', function($scope, config, $mdDialog, $http, $cookies, md5, LoginService) {

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

