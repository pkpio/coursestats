<?php
/**
 * Author   : Praveen Kumar Pendyala (m@praveen.xyz)
 * Created  : 21.08.2015
 *
 * APILogWriter: Custom log writer for our application
 */

class APILogWriter {
    public function write($message, $level = \Slim\Log::DEBUG) {
        // Simple for now
        echo $level.': '.$message.'<br />';
    }
}

