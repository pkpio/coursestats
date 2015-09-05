<?php

/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 27.08.2015
 *
 * For site administration. Currently just for activating users.
 */

$app->group('/admin', $checkAdmin, function () use ($app, $db) {

    $app->group('/user', function () use ($app, $db) {

        //################## List Inactive student accounts ##################
        $app->map('/list/inactive', function () use ($app, $db) {
            try {
                $stmt = $db->prepare('SELECT studentid, name, email FROM students WHERE isactive=0 LIMIT 25');
                $stmt->execute();
                ApiResponse::success(200, "success", "students", $stmt->fetchAll(PDO::FETCH_ASSOC));
            } catch (PDOException $ex) {
                ApiResponse::error(500, "Internal server error");
            }
        })->via('GET', 'POST');

        //################## Activate a user ##################
        $app->map('/activate', function () use ($app, $db) {
            $studentid = $app->request->get('studentid');
            try {
                $stmt = $db->prepare('UPDATE students SET isactive=1, isadder=1 WHERE studentid=?');
                if ($stmt->execute(array($studentid)))
                    ApiResponse::success(200, "success", "studentid", $studentid);
                else
                    ApiResponse::error(500, "activation failed while updating");
            } catch (PDOException $ex) {
                ApiResponse::error(500, "Internal server error");
            }
        })->via('GET', 'POST');
    });

    $app->group('/grade', function () use ($app, $db) {

        //################## List Inactive student accounts ##################
        $app->map('/list/unverified', function () use ($app, $db) {
            try {
                $stmt = $db->prepare('SELECT * FROM autogrades WHERE verified=0 LIMIT 25');
                $stmt->execute();
                ApiResponse::success(200, "success", "autogrades", $stmt->fetchAll(PDO::FETCH_ASSOC));
            } catch (PDOException $ex) {
                ApiResponse::error(500, "Internal server error");
            }
        })->via('GET', 'POST');

        //################## Activate a user ##################
        $app->map('/verify', function () use ($app, $db) {
            $studentid = $app->request->get('studentid');
            $gradeid = $app->request->get('gradeid');

            try {
                $stmt = $db->prepare('UPDATE autogrades SET verified=1 WHERE gradeid=?');
                if ($stmt->execute(array($gradeid)))
                    ApiResponse::success(200, "success", "gradeid", $gradeid);
                else
                    ApiResponse::error(500, "verification failed while updating");
            } catch (PDOException $ex) {
                ApiResponse::error(500, "Internal server error");
            }
        })->via('GET', 'POST');
    });

});