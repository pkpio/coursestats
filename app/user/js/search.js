/**
 * Created by praveen on 25.08.15.
 *
 * For functions related to course tab
 */
angular.module('UserApp').factory('SearchService', function(config, $http, $timeout,$q) {
    var COURSE = 1;
    var TEACHER = 2;

    /**
     * Search a query with server.
     *
     * @param query
     *      Query string
     * @param type
     *      Query type - COURSE / TEACHER
     * @returns
     *      Results of search or an empty array.
     */
    searchRemote = function(query, type){
        var deferred = $q.defer();

        // Pick endpoint based on query type
        var searchUrl = config.apiUrl;
        if(type == COURSE)
            searchUrl += "/course/search?q=" + query;
        else if(type == TEACHER)
            searchUrl += "/teacher/search?q=" + query;
        else
            return [];

        // Make a remote request for results
        var request = {
            method: 'GET',
            url: searchUrl
        };
        $http(request)
            .then(
                function(response){
                    // Resolve promise based on original request type
                    if(type == COURSE)
                        deferred.resolve(response.data.courses);
                    else if (type == TEACHER)
                        deferred.resolve(response.data.teachers);
                    else
                        deferred.resolve([]);
                },
                function(response){
                    console.log(response.toString());
                    deferred.resolve([]);
                }
            );

        return deferred.promise;
    };

    var factory = {};
    /**
     * Searches for courses and teachers with server.
     * @param query
     * @returns {*}
     *      A promise that would eventually resolve to results.
     */
    factory.search = function(query) {
        // Promise we shall return
        var deferred = $q.defer();

        // Results of this search will be accumulated here
        var courses = [];
        var teachers = [];

        $q.all([
            searchRemote(query, COURSE),
            searchRemote(query, TEACHER)
        ]).then(
            function(results){
                deferred.resolve(results[0].concat(results[1]));
            }
        );

        return deferred.promise;
    };

    return factory;
});

angular.module('UserApp').controller('SearchCtrl', function($scope, config, $location, SearchService) {

    // Teacher object
    $scope.search = {
        isDisabled: false,
        noCache: false,
        selectedItem: null,
        searchText: null,
        searchTextChange: function (query) {
            // do nothing
        },
        selectItemChange: function (item) {
            if(!item)
                $location.path('');
            else if(item.courseid)
                $location.path('/course/' + item.courseid);
            else if(item.teacherid)
                $location.path('/teacher/' + item.teacherid);

        },
        querySearch: function (query) {
            return SearchService.search(query);
        },
        getMetadata: function (item) {
            if(item.year)
                return '(' + item.year + ' ' + ((item.semester==1) ? 'Summer' : 'Winter') + ')';
            else
                return '';
        }
    };

    $scope.getConfig = function(){
        return config;
    };

});