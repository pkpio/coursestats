/**
 * Created by praveen on 24.08.15.
 *
 * For functions related to grade tab
 */
angular.module('ContributeApp').controller('GradeCtrl', function($scope, $http, $cookies, CourseService) {
    $scope.message = {
        error: null,
        success: null
    };
    $scope.addingGrade = 0;

    // Course object
    $scope.course = {
        selectedItem: null,
        searchText: null,
        searchCourse: function (query) {
            return CourseService.searchCourse(query);
        }
    };

    // Grade object
    $scope.grades = [
        {
            key: "grade10",
            display: "Grade 1.0",
            value: null
        },
        {
            key: "grade13",
            display: "Grade 1.3",
            value: null
        },
        {
            key: "grade17",
            display: "Grade 1.7",
            value: null
        },
        {
            key: "grade20",
            display: "Grade 2.0",
            value: null
        },
        {
            key: "grade23",
            display: "Grade 2.3",
            value: null
        },
        {
            key: "grade27",
            display: "Grade 2.7",
            value: null
        },
        {
            key: "grade30",
            display: "Grade 3.0",
            value: null
        },
        {
            key: "grade33",
            display: "Grade 3.3",
            value: null
        },
        {
            key: "grade37",
            display: "Grade 3.7",
            value: null
        },
        {
            key: "grade40",
            display: "Grade 4.0",
            value: null
        },
        {
            key: "grade50",
            display: "Grade 5.0",
            value: null
        },
        {
            key: "gradeothers",
            display: "Others",
            value: null
        }
    ];



    $scope.addGrades = function () {

        // Course must be selected
        if(!$scope.course.selectedItem){
            $scope.message.success = '';
            $scope.message.error = "A course must be selected!";
            return;
        }

        // Pre call setup
        $scope.message.success = '';
        $scope.message.error = '';
        $scope.addingGrades = 1;

        // Building REST call url
        var gradeParams = "";
        angular.forEach($scope.grades, function (grade) {
            gradeParams += "&" + grade.key + "=" + grade.value;
        });
        var req = {
            method: 'GET',
            url: 'https://course-stats.appspot.com/grade/add?'
            + 'token=' + $cookies.token
            + '&courseid=' + $scope.course.selectedItem.courseid
            + '&teacherid=' + $scope.course.selectedItem.teacherid
            + gradeParams
        };

        // Making the REST call
        $http(req)
            .then(
            function(response){ // Success callback
                $data = response.data;
                if($data.responsecode == 200){
                    console.log($data);
                    $scope.message.success = 'Add successful!';
                    $scope.message.error = '';

                    // Reset fields
                    $scope.course.searchText = null;
                    angular.forEach($scope.grades, function (grade) {
                        grade.value = null;
                    });
                } else{
                    $scope.message.success = '';
                    $scope.message.error = $data.message;
                }
                $scope.addingGrade = 0;
            },
            function(response){ //Error callback
                $scope.message.success = '';
                $scope.message.error = response.toString();
                $scope.addingGrade = 0;
                console.log(response.toString());
            }
        );

    };

});