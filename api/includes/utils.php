<?php
/**
 * Author   : Praveen Kumar Pendyala (m@praveen.xyz)
 * Created  : 19.08.2015
 *
 * Utility functions
 */

class Utils {

    public static function randomString($length=10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}

