/**
 * Created by praveen on 25.08.15.
 *
 * For functions related to course tab
 */
angular.module('UserApp').factory('SearchService', function(config, $http, $timeout) {
    var factory = {};
    factory.courses = [];
    factory.teachers = [];

    /**
     * Currently using list instead of remote search. This saves many calls!
     * @param query
     */
    searchCourseRemote = function(query){
        if(factory.courses.length > 0)
            return;

        var req = {
            method: 'GET',
            url: config.apiUrl+ '/course/list'
        };
        $http(req)
            .then(
            function(response){ // Success callback
                factory.courses = response.data.courses;
            },
            function(response){ //Error callback
                console.log(response.toString());
            }
        );
    };

    /**
    * Currently using list instead of remote search. This saves many calls!
    * @param query
    */
    searchTeacherRemote = function(query){
        if(factory.teachers.length > 0)
            return;

        var req = {
            method: 'GET',
            url: config.apiUrl+ '/teacher/list'
        };
        $http(req)
            .then(
            function(response){ // Success callback
                factory.teachers = response.data.teachers;
            },
            function(response){ //Error callback
                console.log(response.toString());
            }
        );
    };

    createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            var lowercaseItem = angular.lowercase(item.name);
            return (lowercaseItem.indexOf(lowercaseQuery) >= 0);
        };
    };

    searchTeacher = function (query) {
        var results = query ? factory.teachers.filter(createFilterFor(query)) : [];
        return results;
    };

    searchCourse = function (query) {
        var results = query ? factory.courses.filter(createFilterFor(query)) : [];
        return results;
    };

    factory.search = function (query) {
        var r1 = searchCourse(query);
        var r2 = searchTeacher(query);
        return r1.concat(r2);
    };

    /**
     * Rate-limited remote search logic
     */
    var searchTerm;
    var searchPromise;
    var searchTimeOut = 0; // 0 - listing, 200 - actual remote search!

    doRemoteSearch = function() {
        if(searchTerm) {
            searchPromise = null;
            searchCourseRemote(searchTerm);
            searchTeacherRemote(searchTerm);
        }
    };

    factory.searchRemote = function (query) {
        searchTerm = query;
        if (searchPromise)
            $timeout.cancel(searchPromise);
        searchPromise = $timeout(doRemoteSearch, searchTimeOut);
    };

    return factory;
});

angular.module('UserApp').controller('SearchCtrl', function($scope, config, $location, SearchService) {

    // Teacher object
    $scope.search = {
        isDisabled: false,
        noCache: true,
        selectedItem: null,
        searchText: null,
        searchTextChange: function (query) {
            SearchService.searchRemote(query);
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