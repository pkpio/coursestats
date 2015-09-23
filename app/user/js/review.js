/**
 * Created by praveen on 17.09.15.
 * Handles review add operations
 */

angular.module('UserApp').controller('ReviewCtrl', function ($scope, config, $cookies, $http, $location) {
    if(!$cookies.token){
        $cookies.lastUrl = $location.path();
        $location.path('/login');
        return;
    }

    $scope.params = {
        stars : [1, 2, 3, 4, 5],
        getClass: function(index, selected){
            if(index > selected)
                return 'fa-star-o';

            switch (selected){
                case 1:
                    return 'fa-star star-1';
                case 2:
                    return 'fa-star star-2';
                case 3:
                    return 'fa-star star-3';
                case 4:
                    return 'fa-star star-4';
                case 5:
                    return 'fa-star star-5';
            }
        },
        getHint: function(selected){
            switch (selected){
                case 1:
                    return 'Very hard';
                case 2:
                    return 'Hard';
                case 3:
                    return 'Moderate';
                case 4:
                    return 'Easy';
                case 5:
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
        selected : 3,
        select: function(index){
            if(!$scope.adding)
                $scope.courseLevel.selected = index;
        }
    };
    $scope.examLevel = {
        selected : 3,
        select: function(index){
            if(!$scope.adding)
                $scope.examLevel.selected = index;
        }
    };
    $scope.reviewLevel = {
        selected : 3,
        select: function(index){
            if(!$scope.adding)
                $scope.reviewLevel.selected = index;
        }
    };
    $scope.reviewText = null;

    // Build a review get request for existing review
    var req = {
        method: 'GET',
        url: config.apiUrl + '/review/list/self?'
        + 'token=' + $cookies.token
        +'&courseid=' + $scope.courseid
    };

    // Send it
    $http(req)
        .then(
        function(response){ // Success callback
            $data = response.data;
            if($data.responsecode == 200){
                $review = $data.review[0];
                $scope.reviewText = $review.review;
                $scope.courseLevel.selected = parseInt($review.content_level);
                $scope.examLevel.selected = parseInt($review.exam_level);
                $scope.reviewLevel.selected = parseInt($review.exam_eval_level);
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
            +'&contentlevel=' + $scope.courseLevel.selected
            +'&examlevel=' + $scope.examLevel.selected
            +'&evallevel=' + $scope.reviewLevel.selected
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