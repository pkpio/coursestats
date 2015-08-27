<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 27.08.2015
 *
 * For site administration. Currently just for activating users.
 */

$app->group('/admin', $checkAdmin, function () use ($app, $db) {

    //################## List Inactive student accounts ##################
    $app->map('/list/inactive', function() use ($app, $db) {
        try{
            $stmt = $db->prepare('SELECT studentid, name, email FROM students WHERE verified=0 LIMIT 50');
            $stmt->execute();
            ApiResponse::success(200, "success", "students", $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

    //################## Activate a user ##################
    $app->map('/activate', function() use ($app, $db) {
        $studentid = $app->request->get('studentid');
        try{
            $stmt = $db->prepare('UPDATE students SET verified=1 WHERE studentid=?');
            if ($stmt->execute(array($studentid)))
                ApiResponse::success(200, "success", "studentid", $studentid);
            else
                ApiResponse::error(500, "activation failed while updating");
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});