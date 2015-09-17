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

// Permits setup - used by routes
require 'includes/permits.php';

// Routes setup
require 'routes/student.php';
require 'routes/teacher.php';
require 'routes/course.php';
require 'routes/grade.php';
require 'routes/admin.php';
require 'routes/review.php';

// Common App level middle ware for Cross Site Scripting
class AccessControlOrigin extends \Slim\Middleware
{
    public function call()
    {
        // Get reference to application
        $app = $this->app;

        // Run inner middleware and application
        $this->next->call();

        // Add header to response
        $res = $app->response;
        $res->header('Access-Control-Allow-Origin', '*');
        $res->header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        $res->header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    }
}

$app->add(new \AccessControlOrigin());

// Start the app
$app->run();

