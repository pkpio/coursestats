/**
 * Created by praveen on 25.08.15.
 */
angular.module('UserApp', ['ngMaterial', 'ngRoute', 'chart.js', 'md.data.table'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
});

angular.module('UserApp').constant('config', {
    apiUrl: 'http://api.course-stats.pkp.io'
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
    .when('/',{
        templateUrl : 'includes/default.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});

angular.module('UserApp').controller('AppCtrl', function($scope) {
});

