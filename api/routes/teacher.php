<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * These are the list of actions / api calls for a teacher or course instructor
 */

$app->group('/teacher', function () use ($app, $db, $checkAdder) {

    //################## Add Teacher  ##################
    $app->map('/add', $checkAdder, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $name = $app->request->get('name');
        $website = $app->request->get('website');

        try {
            // Check duplicate
            $stmt0 = $db->prepare('SELECT teacherid FROM teachers WHERE name=?');
            $stmt0->execute(array($name));
            if($stmt0->rowCount() != 0){
                // Teacher already exists. So stop.
                $teacher = $stmt0->fetch(PDO::FETCH_ASSOC);
                ApiResponse::success(200, "success", "teacherid", $teacher['teacherid']);
                $app->stop();
            }

            $stmt = $db->prepare('INSERT INTO teachers (name, website, addedby) VALUES (?, ?, ?)');
            $stmt->execute(array(utf8_encode($name), utf8_encode($website), $userid));
            ApiResponse::success(200, "success", "teacherid", $db->lastInsertId());
        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################# Teachers  ##################
    $app->map('/list', function() use ($app, $db) {
        try{
            $stmt = $db->prepare('SELECT * FROM teachers LIMIT 50');
            $stmt->execute();
            ApiResponse::success(200, "success", "teachers", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Search Teachers  ##################
    $app->map('/search', function() use ($app, $db) {
        $query = $app->request->get('q');
        try{
            $stmt = $db->prepare('SELECT * FROM teachers WHERE name LIKE ? LIMIT 10');
            $stmt->execute(array("%$query%"));
            ApiResponse::success(200, "success", "teachers", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});
