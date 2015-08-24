angular.module('app').controller('coursesController', ['$scope', '$http', function($scope, $http){
    console.log("inside outside coursesController");
    $scope.searchQuery="";
    $scope.searchCourse = function(){
        $http.get('https://course-stats.appspot.com/course/list').success(function(data) {
            console.log(data);
            $scope.courseobj=data.courses;
            console.log("inside get success");
        }).error(function(e){
            console.log("unable to load course list")
        })
    }
}]);
