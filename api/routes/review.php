<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 17.09.2015
 *
 * These are the list of actions / api calls for review actions
 */

$app->group('/review', function () use ($app, $db, $checkToken) {

    //################## Add review  ##################
    $app->map('/add', $checkToken, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $courseid = $app->request->get('courseid');
        $contentLevel = $app->request->get('contentlevel');
        $examLevel = $app->request->get('examlevel');
        $examEvalLevel = $app->request->get('evallevel');
        $review = $app->request->get('review');

        try {
            $stmt = $db->prepare('INSERT INTO reviews
                                  (`studentid`, `courseid`, `content_level`, `exam_level`, `exam_eval_level`, `review`)
                                  VALUES
                                  (:studentid, :courseid, :content_level, :exam_level, :eval_level, :review)

                                  ON DUPLICATE KEY UPDATE
                                  `content_level`=:content_level, `exam_level`=:exam_level,
                                  `exam_eval_level`=:eval_level, `review`=:review');
            $pass = $stmt->execute(array(
                ':studentid' => $userid, ':courseid' => $courseid, ':content_level' => $contentLevel,
                ':exam_level' => $examLevel, ':eval_level' => $examEvalLevel, ':review' => utf8_encode($review) ));

            if($pass)
                ApiResponse::success(200, "success", "reviewid", $db->lastInsertId());
            else
                ApiResponse::error(409, $stmt->errorInfo());

        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Search reviews  ##################
    $app->map('/search', function() use ($app, $db) {
        $courseid = $app->request->get('courseid');

        try{
            $stmt = $db->prepare('SELECT reviews.*,
                                    students.name AS username,
                                    MD5(students.email) AS emailhash
                                  FROM reviews
                                  INNER JOIN students ON students.studentid = reviews.studentid
                                  WHERE reviews.courseid=?');
            $stmt->execute(array($courseid));

            ApiResponse::success(200, "success", "reviews", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## List review  ##################
    $app->map('/list/self', $checkToken, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $courseid = $app->request->get('courseid');

        try{
            $stmt = $db->prepare('SELECT *
                                  FROM reviews
                                  WHERE reviews.courseid=? AND reviews.studentid=?
                                  LIMIT 1');
            $stmt->execute(array($courseid, $userid));

            ApiResponse::success(200, "success", "review", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});
