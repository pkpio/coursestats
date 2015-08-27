<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * These are the list of actions / api calls for course actions
 */

$app->group('/course', function () use ($app, $db, $checkToken) {

    //################## Add Course  ##################
    $app->map('/add', $checkToken, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $name = $app->request->get('name');
        $year = $app->request->get('year');
        $sem = $app->request->get('sem');
        $teacherid = $app->request->get('teacherid');

        try {
            $stmt2 = $db->prepare('INSERT INTO courses (`name`, `teacherid`, `year`, `semester`, `addedby`)
                                   VALUES (?, ?, ?, ?, ?)');
            $stmt2->execute(array(utf8_encode($name), $teacherid, $year, $sem, $userid));
            ApiResponse::success(200, "success", "courseid", $db->lastInsertId());
        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## List Courses  ##################
    $app->map('/list', function() use ($app, $db) {
        try{
            $stmt = $db->prepare('SELECT * FROM courses LIMIT 50');
            $stmt->execute();
            ApiResponse::success(200, "success", "courses", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Search Courses  ##################
    $app->map('/search', function() use ($app, $db) {
        $query = $app->request->get('q');
        try{
            $stmt = $db->prepare('SELECT * FROM courses WHERE name LIKE ? LIMIT 10');
            $stmt->execute(array("%$query%"));
            ApiResponse::success(200, "success", "courses", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});
