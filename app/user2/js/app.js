/**
 * Created by praveen on 25.08.15.
 */
angular.module('UserApp', ['ngMaterial', 'ngRoute', 'chart.js', 'md.data.table'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
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

