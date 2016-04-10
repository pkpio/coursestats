/**
 * Created by praveen on 06.04.16.
 */

angular.module('UserApp').controller('AddGradeCtrl', function($scope, config, $http, $cookies) {
    $scope.message = {
        error: null,
        success: null
    };
    $scope.grade={}
    $scope.addingGrade = 0;

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
        grades.splice(0,1)
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
        $scope.grade.sem= year+' '+semester
        $scope.clipboard=""
    };

    $scope.addGrades = function () {

        // Course must be selected
        if(!$scope.grade.course){
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
        console.log($scope.grade);
        console.log($scope.grades);
        angular.forEach($scope.grades, function (grade) {
            gradeParams += "&" + grade.key + "=" + grade.value;
        });
        var req = {
            method: 'GET',
            url: config.apiUrl + '/grade/add?'
            + 'token=' + $cookies.token
            + '&courseid=' + $scope.grade.courseid
            + '&teacherid=' + $scope.grade.prof
            + $scope.grades
        };

        // Making the REST call

    };

});