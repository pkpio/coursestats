/**
 * Created by praveen on 25.08.15.
 *
 * For functions related to course tab
 */
angular.module('UserApp').factory('SearchService', function(config, $http, $timeout,$q) {
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
        getRemoteCourseList(req).then(
            function(response){
                factory.courses = response.data.courses;
            }
        );
    };

    getRemoteCourseList = function (req) {
        var deferred = $q.defer();
        $http(req)
            .then(
            function(response){ // Success callback
                deferred.resolve(response);
            },
            function(response){ //Error callback
                console.log(response.toString());
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };

    /**
    * Currently using list instead of remote search. This saves many calls!
    * @param query
    */
    searchTeacherRemote = function(query) {
        if (factory.teachers.length > 0)
            return;
        var req = {
            method: 'GET',
            url: config.apiUrl + '/teacher/list'
        };
        factory.teachersListPromise = getRemoteTeacherList(req).then(
            function (response) {
                factory.teachers = response.data.teachers;
            }
        );
    };

    getRemoteTeacherList = function (req) {
        var deferred = $q.defer();
        $http(req)
            .then(
            function(response){ // Success callback
                deferred.resolve(response);
            },
            function(response){ //Error callback
                console.log(response.toString());
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };

    createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            var lowercaseItem = angular.lowercase(item.name);
            return (lowercaseItem.indexOf(lowercaseQuery) >= 0);
        };
    };

    searchTeacher = function (query) {
        return factory.teachers.filter(createFilterFor(query));
    };

    searchCourse = function (query) {
        return factory.courses.filter(createFilterFor(query))
    };

    factory.search = function (query) {
        var r1 = searchCourse(query);
        var r2 = searchTeacher(query);
        return r1.concat(r2);
    };

    /**
     * Rate-limited remote search logic

    var searchTerm;
    var searchPromise;
    var searchTimeOut = 0; // 0 - listing, 200 - actual remote search!
     */
    factory.searchRemote = function () {
        searchCourseRemote();
        searchTeacherRemote();
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