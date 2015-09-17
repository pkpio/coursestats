<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 17.09.2015
 *
 * These are the list of actions / api calls for review actions
 */

$app->group('/review', function () use ($app, $db, $checkAdder) {

    //################## Add review  ##################
    $app->map('/add', $checkAdder, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $courseid = $app->request->get('courseid');
        $contentLevel = $app->request->get('contentlevel');
        $examLevel = $app->request->get('examlevel');
        $examEvalLevel = $app->request->get('evallevel');
        $review = $app->request->get('review');

        try {
            $stmt = $db->prepare('INSERT INTO reviews (`studentid`, `courseid`, `content_level`, `exam_level`,
                                  `exam_eval_level`, `review`) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->execute(array($userid, $courseid, $contentLevel, $examLevel, $examEvalLevel, utf8_encode($review)));

            ApiResponse::success(200, "success", "reviewid", $db->lastInsertId());
        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Search reviews  ##################
    $app->map('/search', function() use ($app, $db) {
        $courseid = $app->request->get('courseid');

        try{
            $stmt = $db->prepare('SELECT * FROM reviews WHERE courseid=?');
            $stmt->execute(array($courseid));

            ApiResponse::success(200, "success", "reviews", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});
