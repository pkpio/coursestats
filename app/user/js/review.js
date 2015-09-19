/**
 * Created by praveen on 17.09.15.
 * Handles review add operations
 */

angular.module('UserApp').controller('ReviewCtrl', function ($scope, config, $cookies, $http, $location) {
    if(!$cookies.token){
        $cookies.lastUrl = $location.path();
        $location.path('/login');
    }

    $scope.params = {
        stars : [0, 1, 2, 3, 4],
        getClass: function(index, selected){
            if(index > selected)
                return 'fa-star-o';

            switch (selected){
                case 0:
                    return 'fa-star star-1';
                case 1:
                    return 'fa-star star-2';
                case 2:
                    return 'fa-star star-3';
                case 3:
                    return 'fa-star star-4';
                case 4:
                    return 'fa-star star-5';
            }
        },
        getHint: function(selected){
            switch (selected){
                case 0:
                    return 'Very hard';
                case 1:
                    return 'Hard';
                case 2:
                    return 'Moderate';
                case 3:
                    return 'Easy';
                case 4:
                    return 'Very easy';
            }
        }
    };
    $scope.adding = false;
    $scope.addError = null;
    $scope.addSuccess = null;

    // Set courseid
    var path = $location.path();
    $scope.courseid = path.substr(path.lastIndexOf('/') + 1, path.length);

    // Individual rating objects
    $scope.courseLevel = {
        selected : 2,
        select: function(index){
            if(!$scope.adding)
                $scope.courseLevel.selected = index;
        }
    };
    $scope.examLevel = {
        selected : 2,
        select: function(index){
            if(!$scope.adding)
                $scope.examLevel.selected = index;
        }
    };
    $scope.reviewLevel = {
        selected : 2,
        select: function(index){
            if(!$scope.adding)
                $scope.reviewLevel.selected = index;
        }
    };
    $scope.reviewText = null;

    $scope.submit = function() {

        if($scope.reviewText && $scope.reviewText.length > 500) {
            $scope.addError = "Review text too long!";
            return;
        }

        $scope.adding = 1;

        // Build a review add request
        var req = {
            method: 'GET',
            url: config.apiUrl + '/review/add?'
            + 'courseid=' + $scope.courseid
            +'&contentlevel=' + ($scope.courseLevel.selected+1)
            +'&examlevel=' + ($scope.examLevel.selected+1)
            +'&evallevel=' + ($scope.reviewLevel.selected+1)
            +'&review=' + $scope.reviewText
            +'&token=' + $cookies.token
        };

        // Send it
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                if($data.responsecode == 200){
                    $scope.addSuccess = "Review added!";
                    $scope.addError = "";
                } else{
                    $scope.addSuccess = "";
                    $scope.addError = $data.message;
                }
                $scope.adding = 0;
            },
            function(response){ //Error callback
                $scope.addSuccess = "";
                $scope.addError = response.toString();
                $scope.adding = 0;
            }
        );
    };

});