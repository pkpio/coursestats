<?php
/**
 * Author   : Praveen Kumar Pendyala (m@praveen.xyz)
 * Created  : 19.08.2015
 *
 * Common responses from various API endpoints
 */

class ApiResponse{

    public static function error($code, $msg){
        $response = array(
                        'responsecode' => $code,
                        'message' => $msg
                    );
        echo json_encode($response);
    }

    public static function success($code, $msg, $name, $value){
        $response = array(
                        'responsecode' => $code,
                        'message' => $msg,
                        $name => $value
                    );
        echo json_encode($response);
    }
}
