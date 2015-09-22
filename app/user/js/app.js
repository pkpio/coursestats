/**
 * Created by praveen on 25.08.15.
 */
angular.module('UserApp', ['ngMaterial', 'ngRoute', 'ngCookies', 'ngMd5', 'chart.js', 'angulartics',
    'angulartics.google.analytics'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
});

angular.module('UserApp').constant('config', {
    apiUrl: 'https://api.coursestats.de',
    minCharsInSearch: 2
});

// Route configuration
angular.module('UserApp').config(function($routeProvider) {$routeProvider
    .when('/course/:id',{
        templateUrl : 'includes/grade.html',
        controller  : 'GradeCtrl'
    })
    .when('/teacher/:id',{
        templateUrl : 'includes/grade.html',
        controller  : 'GradeCtrl'
    })
    .when('/review/:id',{
        templateUrl : 'includes/review.html',
        controller  : 'ReviewCtrl'
    })
    .when('/login',{
        templateUrl : 'includes/login.html',
        controller  : 'LoginCtrl'
    })
    .when('/register',{
        templateUrl : 'includes/register.html',
        controller  : 'RegisterCtrl'
    })
    .when('/',{
        templateUrl : 'includes/default.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});

angular.module('UserApp').controller('AppCtrl', function($scope) {

});

