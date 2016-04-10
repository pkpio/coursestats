<?php
/**
 * Author	: Praveen Kumar Pendyala (m@praveen.xyz)
 * Created	: 21.08.2015
 *
 * Set of middleware functions to simplify some common tasks and checks!
 */

/**
 * Token Verifier function for anyone. Doesn't check any permits.
 * Should be used only for token revocation.
 */
$checkToken = function () use ($app, $db) {
    $token = $app->request->params('token');
    try{
        // Verify token
        $stmt = $db->prepare('SELECT studentid FROM students WHERE token=?');
        $stmt->execute(array($token));
        $user = $stmt->fetch(PDO::FETCH_ASSOC);


        if(!$user){
            ApiResponse::error(403, "Invalid token");
            $app->stop();
        }

        // All pass. Set studentid in headers
        $app->request->headers->set("studentid", $user['studentid']);

    } catch(PDOException $ex){
        ApiResponse::error(500, "Internal server error");
        $app->stop();
    }
};

/**
 * Token Verifier function for contributors.
 */
$checkAdder = function () use ($app, $db) {
    $token = $app->request->params('token');
    try{
        // Verify token
        $stmt = $db->prepare('SELECT studentid, isactive, isadder FROM students WHERE token=?');
        $stmt->execute(array($token));
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$user){
            ApiResponse::error(403, "Invalid token");
            $app->stop();
        }

        if($user['isactive'] != 1){
            //ApiResponse::error(403, "Account not activated");
            //$app->stop();
        }

        if($user['isadder'] != 1){
            //ApiResponse::error(403, "Insufficient permissions");
            //$app->stop();
        }

        // All pass. Set studentid in headers
        $app->request->headers->set("studentid", $user['studentid']);

    } catch(PDOException $ex){
        ApiResponse::error(500, "Internal server error");
        $app->stop();
    }
};

/**
 * Token Verifier function for admins.
 */
$checkAdmin = function () use ($app, $db) {
    $token = $app->request->params('token');
    try{
        // Verify token
        $stmt = $db->prepare('SELECT studentid, isactive, isadmin FROM students WHERE token=?');
        $stmt->execute(array($token));
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$user){
            ApiResponse::error(403, "Invalid token");
            $app->stop();
        }

        if($user['isactive'] != 1){
            ApiResponse::error(403, "Account not activated");
            $app->stop();
        }

        if($user['isadmin'] != 1){
            ApiResponse::error(403, "Insufficient permissions");
            $app->stop();
        }

        // All pass. Set studentid in headers
        $app->request->headers->set("studentid", $user['studentid']);

    } catch(PDOException $ex){
        ApiResponse::error(500, "Internal server error");
        $app->stop();
    }
};


/**
 * Token Verifier function for crawlers.
 */
$checkCrawler = function () use ($app, $db) {
    $token = $app->request->params('token');
    try{
        // Verify token
        $stmt = $db->prepare('SELECT studentid, isactive, iscrawler FROM students WHERE token=?');
        $stmt->execute(array($token));
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$user){
            ApiResponse::error(403, "Invalid token");
            $app->stop();
        }

        if($user['isactive'] != 1){
            ApiResponse::error(403, "Account not activated");
            $app->stop();
        }

        if($user['iscrawler'] != 1){
            ApiResponse::error(403, "Insufficient permissions");
            $app->stop();
        }

        // All pass. Set studentid in headers
        $app->request->headers->set("studentid", $user['studentid']);

    } catch(PDOException $ex){
        ApiResponse::error(500, "Internal server error");
        $app->stop();
    }
};
