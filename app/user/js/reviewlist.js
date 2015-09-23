/**
 * Created by praveen on 17.09.15.
 * Handles review add operations
 */

angular.module('UserApp').controller('ReviewListCtrl', function ($scope, config, $http, $location) {

    $scope.params = {
        stars : [1, 2, 3, 4, 5],
        getClass: function(ind, val){
            var index = parseInt(ind);
            var value = parseInt(val);

            if(index > value)
                return 'fa-star-o';

            switch (value){
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
        getHint: function(val){
            var value = parseInt(val);
            switch (value){
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

    // Set courseid
    var path = $location.path();
    $scope.courseid = path.substr(path.lastIndexOf('/') + 1, path.length);

    // Build a review list request
    var req = {
        method: 'GET',
        url: config.apiUrl + '/review/search?'
        + 'courseid=' + $scope.courseid
    };

    // Send it
    $http(req)
        .then(
        function(response){ // Success callback
            $data = response.data;
            $scope.reviews = $data.reviews;
        },
        function(response){ //Error callback
            console.log("Error!");
            // -TODO- Error handling
        }
    );

    $scope.user = {
        getProfile : function(emailhash){
            return 'https://secure.gravatar.com/' + emailhash;
        },
        getImage : function(emailhash){
            return 'https://secure.gravatar.com/avatar/' + emailhash + '?d=mm';
        }
    };

});