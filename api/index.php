<?php
/**
 * Author   : Praveen Kumar Pendyala (m@praveen.xyz)
 * Created  : 21.08.2015
 *
 * The main application bootstrapping takes place here.
 */

require 'vendor/autoload.php';
require 'includes/utils.php';
require 'includes/logger.php';
require 'includes/response.php';

// Slim app setup
$app = new \Slim\Slim(array(
		'mode' => 'development',
		'log.enabled' => true,
		'log.level' => \Slim\Log::DEBUG,
		'log.writer' => new APILogWriter()
	)
);

// Database setup
$db = new pdo('mysql:unix_socket=/cloudsql/course-stats:sqldb;dbname=coursestats',
    'root',  // username
    ''       // password
);

// Middleware setup - used by routes
require 'includes/middleware.php';

// Routes setup
require 'routes/student.php';
require 'routes/teacher.php';
require 'routes/course.php';
require 'routes/grade.php';

// Start the app
$app->run();

