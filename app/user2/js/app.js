/**
 * Created by praveen on 25.08.15.
 */
angular.module('UserApp', ['ngMaterial', 'ngRoute'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('blue');
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
    });
});

angular.module('UserApp').controller('AppCtrl', function($scope) {
});

