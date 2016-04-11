/**
 * Created by praveen on 06.04.16.
 */

angular.module('UserApp').controller('AddGradeCtrl', function($scope, config, $http, $cookies) {
    $scope.message = {
        error: null,
        success: null
    };
    $scope.grade={};
    $scope.addingGrade = 0;
    $scope.showfields = 0;

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
    console.log($scope.grades);
    $scope.parseData = function (data) {
        if(data==""){return}
        var others=null;
        var arr = data.split('\n');
        if(arr.length<17){ return;}
        var tucan = arr[2].split(' ')[0];
        var courseName = arr[2].split('  ')[1].split(',')[0];
        var semester = arr[2].split('  ')[1].split(',')[1].split(' ')[1];
        var year = arr[2].split('  ')[1].split(',')[1].split(' ')[2].split('/')[0];
        var grades = arr[11].split('	');
        var date = arr[6].split(',')[1];
        grades.splice(0,1);
        semester = (semester=='WiSe') ? 'Winter':'Summer';
        arr.forEach(function (item) {
            if(item.indexOf('Missing')>-1){
                others+=parseInt(item.split(':')[1])
            }
        });
        for (i = 0; i < $scope.grades.length; i++) {
            $scope.grades[i].value=(i == 11) ? others : grades[i];
        }
        $scope.grade.course=courseName;
        $scope.grade.sem= year+' '+semester;
        $scope.showfields = 1;
        $scope.clipboard=""
    };

    $scope.addGrades = function () {

        // Course must be selected - TODO- additional checks as well
        if(!$scope.grade.course || !$scope.grade.sem){
            $scope.message.success = '';
            $scope.message.error = "Course and sem must be selected!";
            return;
        }

        // Fill default prof name if empty
        if(!$scope.grade.prof)
            $scope.grade.prof = "Prof. X";

        // Pre API calls setup
        $scope.message.success = '';
        $scope.message.error = '';
        $scope.addingGrade = 1;

        // 1. Add teacher
        var req = {
            method: 'GET',
            url: config.apiUrl + '/teacher/add?'
            + 'token=' + $cookies.token
            + '&name=' + $scope.grade.prof
        };
        $http(req)
            .then(
                function(response){ // Success callback
                    $data = response.data;
                    if($data.responsecode == 200){
                        // Add course and grades using this teacherid
                        addCourseAndGrades($data.teacherid);
                    } else{
                        throwError($data.message);
                    }
                },
                function(response){ //Error callback
                    throwError(response.toString());
                }
            );
    };

    addCourseAndGrades = function($teacherid){
        var req = {
            method: 'GET',
            url: config.apiUrl + '/course/add?'
            + 'token=' + $cookies.token
            + '&name=' + $scope.grade.course
            + '&year=' + getYear($scope.grade.sem)
            + '&sem=' + getSem(($scope.grade.sem))
            + '&teacherid=' + $teacherid
        };

        $http(req)
            .then(
                function(response){ // Success callback
                    $data = response.data;
                    if($data.responsecode == 200){
                        // Add grades for this course using this courseid
                        addCourseGrades($data.courseid, $teacherid);
                    } else{
                        throwError($data.message);
                    }
                },
                function(response){ //Error callback
                    throwError(response.toString());
                }
            );

    };

    addCourseGrades = function($courseid, $teacherid){
        var gradeParams = "";
        angular.forEach($scope.grades, function (grade) {
            gradeParams += "&" + grade.key + "=" + grade.value;
        });
        var req = {
            method: 'GET',
            url: config.apiUrl + '/grade/add?'
            + 'token=' + $cookies.token
            + '&courseid=' + $courseid
            + '&teacherid=' + $teacherid
            + gradeParams
        };

        $http(req)
            .then(
                function(response){ // Success callback
                    $data = response.data;
                    if($data.responsecode == 200){
                        $scope.message.success = 'Added successfully!';
                        $scope.message.error = '';
                    } else{
                        throwError($data.message);
                    }
                    $scope.addingGrade = 0;
                },
                function(response){ //Error callback
                    throwError(response.toString());
                }
            );
    };

    getYear = function($semtext){
        return $semtext.substr(0, 4);
    };

    getSem = function($semtext){
        if($semtext.indexOf('Winter') > -1)
            return "2";
        else
            return "1";
    };

    throwError = function($errorMsg){
        $scope.message.success = '';
        $scope.message.error = $errorMsg;
        $scope.addingGrade = 0;
    };

});