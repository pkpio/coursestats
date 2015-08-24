<?php
/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 * 
 * These are the list of actions / api calls for a user
 */

$app->group('/student', function () use ($app, $db, $checkToken) {
    
    //################## Register  ##################
    $app->map('/register', function() use ($app, $db) {
        $name = $app->request->params('fullname');
        $password = $app->request->params('password');
        $email = $app->request->params('email');
        $emailcode = Utils::randomString(10);

        try{
            $stmt = $db->prepare('SELECT 1 FROM students WHERE email=?');
            $stmt->execute(array($email));

            if($stmt->rowCount() != 0){
                // Email already exists. So stop.
                ApiResponse::error(409, "Email already registered");
                $app->stop();
            }

            $stmt2 = $db->prepare('INSERT INTO students (name, email, password, emailcode)
                        VALUES (?, ?, ?, ?)');
            $stmt2->execute(array($name, $email, $password, $emailcode));
            ApiResponse::success(200, "Registered!", "studentid", $db->lastInsertId());
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    });//->via('GET', 'POST');

    //################## Login  ##################
    $app->map('/login', function() use ($app, $db) {
        $email = $app->request->params('email');
        $password = $app->request->params('password');

        try{
            // Check credentials
            $stmt = $db->prepare('SELECT token, verified FROM students WHERE email=? AND password=?');
            $stmt->execute(array($email, $password));
            $user = $stmt->fetch();

            if(!$user){
                // Wrong credentials
                ApiResponse::error(403, "Invalid credentials");
                $app->stop();
            }

            if(!$user['verified']){
                // Account not verified
                ApiResponse::error(403, "Account not activated. Contact Admin.");
                $app->stop();
            }

            // Correct credentials. Send a token
            ApiResponse::success(200, "success", "token", $user['token']);
        } catch(PDOException $ex){
            ApiResponse::error(500, "Internal server error");
        }
    })->via('GET', 'POST');

});

