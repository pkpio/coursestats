<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * These are the list of actions / api calls for grade actions
 */

$app->group('/grade', function () use ($app, $db, $checkToken, $checkCrawler) {

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
        $extras = $app->request->get('extras');

        if(!$extras || $extras == "")
            $extras = "NA";

        try {
            // Check for duplicate
            $stmt0 = $db->prepare('SELECT gradeid FROM grades WHERE courseid=?');
            $stmt0->execute(array($courseid));
            if($stmt0->rowCount() != 0){
                // Course grades already exists. So stop.
                $grade = $stmt0->fetch(PDO::FETCH_ASSOC);
                ApiResponse::success(200, "success", "gradeid", $grade['gradeid']);
                $app->stop();
            }

            $stmt = $db->prepare('INSERT INTO grades (`courseid`, `teacherid`, `addedby`,
                                    `grade_10`, `grade_13`, `grade_17`,
                                    `grade_20`, `grade_23`, `grade_27`,
                                    `grade_30`, `grade_33`, `grade_37`,
                                    `grade_40`, `grade_50`, `grade_others`,
                                    `extras`)
                                   VALUES (:courseid, :teacherid, :addedby,
                                   :grade_10, :grade_13, :grade_17,
                                   :grade_20, :grade_23, :grade_27,
                                   :grade_30, :grade_33, :grade_37,
                                   :grade_40, :grade_50, :grade_others,
                                   :extras)');
            $result = $stmt->execute(array(':courseid' => $courseid, ':teacherid' => $teacherid, ':addedby' => $userid,
                        ':grade_10' => $grade_1, ':grade_13' => $grade_13, ':grade_17' => $grade_17,
                        ':grade_20' => $grade_2, ':grade_23' => $grade_23, ':grade_27' => $grade_27,
                        ':grade_30' => $grade_3, ':grade_33' => $grade_33, ':grade_37' => $grade_37,
                        ':grade_40' => $grade_4, ':grade_50' => $grade_5, ':grade_others' => $grade_others,
                        ':extras' => $extras));

            if($result)
                ApiResponse::success(200, "success", "gradeid", $db->lastInsertId());
            else
                ApiResponse::error(500, $stmt->errorInfo());

        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');


    //################## Add Auto Grades - for crawler ##################
    $app->map('/add/auto', $checkCrawler, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $cname = $app->request->params('cname');
        $cyear = $app->request->params('cyear');
        $csem = $app->request->params('csem');
        $tucanid = $app->request->params('tucanid');

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
            // Check for duplicate
            $stmt = $db->prepare('SELECT 1 FROM autogrades WHERE coursename=? AND courseyear=? AND coursesem=?');
            $stmt->execute(array(utf8_encode($cname), $cyear, $csem));
            if($stmt->rowCount() != 0){
                // Course already exists. So stop.
                ApiResponse::error(409, "Course already added");
                $app->stop();
            }

            $stmt2 = $db->prepare('INSERT INTO autogrades (`coursename`, `courseyear`, `coursesem`, `addedby`, `tucanid`,
                                    `grade_10`, `grade_13`, `grade_17`,
                                    `grade_20`, `grade_23`, `grade_27`,
                                    `grade_30`, `grade_33`, `grade_37`,
                                    `grade_40`, `grade_50`, `grade_others`)
                                   VALUES (:coursename, :courseyear, :coursesem, :addedby, :tucanid,
                                   :grade_10, :grade_13, :grade_17,
                                   :grade_20, :grade_23, :grade_27,
                                   :grade_30, :grade_33, :grade_37,
                                   :grade_40, :grade_50, :grade_others)');
            $stmt2->execute(array(
                ':coursename' => utf8_encode($cname), ':courseyear' => $cyear, ':coursesem' => $csem,
                ':addedby' => $userid, ':tucanid' => $tucanid,
                ':grade_10' => $grade_1, ':grade_13' => $grade_13, ':grade_17' => $grade_17,
                ':grade_20' => $grade_2, ':grade_23' => $grade_23, ':grade_27' => $grade_27,
                ':grade_30' => $grade_3, ':grade_33' => $grade_33, ':grade_37' => $grade_37,
                ':grade_40' => $grade_4, ':grade_50' => $grade_5, ':grade_others' => $grade_others));

            ApiResponse::success(200, "success", "gradeid", $db->lastInsertId());
        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Search Grades   ##################
    $app->map('/search', function() use ($app, $db) {
        $courseid = $app->request->params('courseid');
        $teacherid = $app->request->params('teacherid');

        try{
            // Courseid search
            if($courseid){
                $stmt = $db->prepare('UPDATE courses SET searchcount=searchcount+1
                                      WHERE courseid=?');
                $stmt->execute(array($courseid));

                $stmt2 = $db->prepare('
                                  SELECT grades.*,
                                      courses.name AS coursename,
                                      courses.year AS courseyear,
                                      courses.semester AS coursesem,
                                      teachers.name AS teachername,
                                      AVG(reviews.content_level) AS contentlevel,
                                      AVG(reviews.exam_level) AS examlevel,
                                      AVG(reviews.exam_eval_level) AS examevallevel
                                  FROM grades
                                  INNER JOIN courses ON grades.courseid = courses.courseid
                                  INNER JOIN teachers ON grades.teacherid = teachers.teacherid
                                  LEFT JOIN reviews ON grades.courseid = reviews.courseid
                                  WHERE grades.courseid
                                  IN (

                                    SELECT courseid
                                    FROM courses
                                    WHERE linkedid
                                    IN (

                                        SELECT linkedid
                                        FROM courses
                                        WHERE courseid=?
                                    )
                                  )
                                  GROUP BY grades.courseid
                                  ');
                $stmt2->execute(array($courseid));
                ApiResponse::success(200, "success", "grades", $stmt2->fetchAll(PDO::FETCH_ASSOC));
            }

            // Teacherid search
            else{
                $stmt = $db->prepare('UPDATE teachers SET searchcount=searchcount+1
                                      WHERE teacherid=?');
                $stmt->execute(array($teacherid));

                $stmt2 = $db->prepare('
                                  SELECT grades.*,
                                      courses.name AS coursename,
                                      teachers.name AS teachername,
                                      courses.year AS courseyear,
                                      courses.semester AS coursesem,
                                      AVG(reviews.content_level) AS contentlevel,
                                      AVG(reviews.exam_level) AS examlevel,
                                      AVG(reviews.exam_eval_level) AS examevallevel
                                  FROM grades
                                  INNER JOIN courses ON grades.courseid = courses.courseid
                                  INNER JOIN teachers ON grades.teacherid = teachers.teacherid
                                  LEFT JOIN reviews ON grades.courseid = reviews.courseid
                                  WHERE grades.teacherid=?
                                  GROUP BY grades.courseid
                                  ');
                $stmt2->execute(array($teacherid));
                ApiResponse::success(200, "success", "grades", $stmt2->fetchAll(PDO::FETCH_ASSOC));
            }
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});
