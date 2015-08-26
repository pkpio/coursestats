/**
 * Created by praveen on 25.08.15.
 */

angular.module('UserApp').controller('GradeCtrl', function($scope, config, $http, $location) {
    const TEACHER = 1;
    const COURSE = 2;

    $scope.mode = TEACHER;

    // Find out the mode and id
    var path = $location.path();
    if(path.indexOf('/course/') > -1)
        $scope.mode = COURSE;
    $scope.id = path.substr(path.lastIndexOf('/') + 1, path.length);
    $scope.grades = [];

    function buildGrades(gradesResp){

        for(i=0; i<gradesResp.length; i++){
            grade = gradesResp[i];

            displayGrade = {
                "table" : [
                    {
                        key: "grade10",
                        display: "1.0",
                        value: grade.grade_10
                    },
                    {
                        key: "grade13",
                        display: "1.3",
                        value: grade.grade_13
                    },
                    {
                        key: "grade17",
                        display: "1.7",
                        value: grade.grade_17
                    },
                    {
                        key: "grade20",
                        display: "2.0",
                        value: grade.grade_20
                    },
                    {
                        key: "grade23",
                        display: "2.3",
                        value: grade.grade_23
                    },
                    {
                        key: "grade27",
                        display: "2.7",
                        value: grade.grade_27
                    },
                    {
                        key: "grade30",
                        display: "3.0",
                        value: grade.grade_30
                    },
                    {
                        key: "grade33",
                        display: "3.3",
                        value: grade.grade_33
                    },
                    {
                        key: "grade37",
                        display: "3.7",
                        value: grade.grade_37
                    },
                    {
                        key: "grade40",
                        display: "4.0",
                        value: grade.grade_40
                    },
                    {
                        key: "grade50",
                        display: "5.0",
                        value: grade.grade_50
                    },
                    {
                        key: "gradeothers",
                        display: "Others",
                        value: grade.grade_others
                    }
                ],
                graph: {
                    "data": [[
                        parseInt(grade.grade_10), parseInt(grade.grade_13), parseInt(grade.grade_17),
                        parseInt(grade.grade_20), parseInt(grade.grade_23), parseInt(grade.grade_27),
                        parseInt(grade.grade_30), parseInt(grade.grade_33), parseInt(grade.grade_37),
                        parseInt(grade.grade_40), parseInt(grade.grade_50), parseInt(grade.grade_others)
                    ]]
                },
                original: grade
            };
            $scope.grades.push(displayGrade);
        }
    }

    // Get grades
    var urloption = ($scope.mode == TEACHER) ? "teacherid" : "courseid";
    var req = {
        method: 'GET',
        url: config.apiUrl + '/grade/search?' + urloption + '=' + $scope.id
    };
    $http(req)
        .then(
        function(response){ // Success callback
            buildGrades(response.data.grades);
        },
        function(response){ //Error callback
            console.log(response.toString());
        }
    );

    labels = ["1.0", "1.3", "1.7", "2.0", "2.3", "2.7", "3.0", "3.3", "3.7", "4.0", "5.0", "others"];
    $scope.getData = function (grade){
        console.log(grade.graph.data);
        return grade.graph.data;
    };
    $scope.getLabel = function (grade) {
        return labels;
    };
});
