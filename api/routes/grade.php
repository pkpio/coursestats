<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * These are the list of actions / api calls for grade actions
 */

$app->group('/grade', function () use ($app, $db, $checkToken) {

    //################## Add Grades  ##################
    $app->map('/add', $checkToken, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $courseid = $app->request->params('courseid');
        $teacherid = $app->request->params('teacherid');

        // Grade stats
        $grade_1 = $app->request->params('grade10');
        $grade_13 = $app->request->params('grade13');
        $grade_17 = $app->request->params('grade17');
        $grade_2 = $app->request->params('grade20');
        $grade_23 = $app->request->params('grade23');
        $grade_27 = $app->request->params('grade27');
        $grade_3 = $app->request->params('grade30');
        $grade_33 = $app->request->params('grade33');
        $grade_37 = $app->request->params('grade37');
        $grade_4 = $app->request->params('grade40');
        $grade_5 = $app->request->params('grade50');
        $grade_others = $app->request->params('gradeothers');

        try {
            $stmt = $db->prepare('INSERT INTO grades (`courseid`, `teacherid`, `addedby`,
                                    `grade_1.0`, `grade_1.3`, `grade_1.7`,
                                    `grade_2.0`, `grade_2.3`, `grade_2.7`,
                                    `grade_3.0`, `grade_3.3`, `grade_3.7`,
                                    `grade_4.0`, `grade_5.0`, `grade_others`)
                                   VALUES (:courseid, :teacherid, :addedby,
                                   :grade_10, :grade_13, :grade_17,
                                   :grade_20, :grade_23, :grade_27,
                                   :grade_30, :grade_33, :grade_37,
                                   :grade_40, :grade_50, :grade_others)');
            $stmt->execute(array(':courseid' => $courseid, ':teacherid' => $teacherid, ':addedby' => $userid,
                        ':grade_10' => $grade_1, ':grade_13' => $grade_13, ':grade_17' => $grade_17,
                        ':grade_20' => $grade_2, ':grade_23' => $grade_23, ':grade_27' => $grade_27,
                        ':grade_30' => $grade_3, ':grade_33' => $grade_33, ':grade_37' => $grade_37,
                        ':grade_40' => $grade_4, ':grade_50' => $grade_5, ':grade_others' => $grade_others));

            ApiResponse::success(200, "success", "gradeid", $db->lastInsertId());
        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## List Grades   ##################
    $app->map('/list', function() use ($app, $db) {
        try{
            $stmt = $db->prepare('SELECT * FROM grades LIMIT 50');
            $stmt->execute();
            ApiResponse::success(200, "success", "grades", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Search Grades   ##################
    $app->map('/search', function() use ($app, $db) {
        $courseid = $app->request->get('courseid');
        try{
            $stmt = $db->prepare('SELECT * FROM grades WHERE courseid=?');
            $stmt->execute(array($courseid));
            ApiResponse::success(200, "success", "grades", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});