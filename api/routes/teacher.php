<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * These are the list of actions / api calls for a teacher or course instructor
 */

$app->group('/teacher', function () use ($app, $db, $checkToken) {

    //################## Add Teacher  ##################
    $app->map('/add', $checkToken, function () use ($app, $db) {
        $userid = $app->request->headers->get("studentid");
        $name = $app->request->get('name');
        $website = $app->request->get('website');

        try {
            $stmt = $db->prepare('INSERT INTO teachers (name, website, addedby) VALUES (?, ?, ?)');
            $stmt->execute(array($name, $website, $userid));
            ApiResponse::success(200, "success", "teacherid", $db->lastInsertId());
        } catch (PDOException $ex) {
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## List Teachers  ##################
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