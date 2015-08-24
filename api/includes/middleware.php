<?php
/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * Set of middleware functions to simplify some common tasks and checks!
 */

/**
 * Token Verifier function. Should be a middleware for user permissions required routes
 */
$checkToken = function () use ($app, $db) {
    $token = $app->request->get('token');
    try{
        // Verify token
        $stmt = $db->prepare('SELECT studentid, verified FROM users WHERE token=?');
        $stmt->execute(array($token));
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['verified'] == 1){
            // Set studentid as a header in request. This is to pass id to closure
            $app->request->headers->set("studentid", $user['studentid']);
        } else{
            // Invalid token case
            ApiResponse::error(403, "Invalid token");
            $app->stop();
        }
    } catch(PDOException $ex){
        ApiResponse::error(500, "Internal server error");
        $app->stop();
    }
};

