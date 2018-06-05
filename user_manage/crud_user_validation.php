<?php
require_once(__DIR__."/../php_include/check_session.php");
require_once(__DIR__."/../php_include/db_connect.php");


$method = $_SERVER["REQUEST_METHOD"];

$_SESSION['last_login_timestamp'] = time();
//switch case to get HTTP method
switch($method){
    case 'GET':
        // for edit user
        if(isset($_GET['username']) and isset($_GET['id']) and !isset($_GET['email'])){
            // if get has username and id
            $user = $_GET['username'];
            $id = $_GET['id'];
            $query = "SELECT DISTINCT USERNAME FROM user_table where ID!=$id AND USERNAME='$user'";
            $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

            $count = mysqli_num_rows($result);
            if($count >= 1){
                //have same username
                $usernameObj = new \stdClass();
                $usernameObj -> validate = "false";
                // $usernameObj -> hello = "hello";
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }else{
                //unique
                $usernameObj = new \stdClass();
                $usernameObj -> validate = 'true';
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }
        // add user
      }else if (isset($_GET['username']) and !isset($_GET['id']) and !isset($_GET['email'])){
            $user = $_GET['username'];
            $query = "SELECT DISTINCT USERNAME FROM user_table where USERNAME='$user'";
            $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

            $count = mysqli_num_rows($result);
            if($count == 1){
                //have same username
                $usernameObj = new \stdClass();
                // $usernameObj -> hi = "hi";
                $usernameObj -> validate = "false";
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }else{
                //unique
                $usernameObj = new \stdClass();
                $usernameObj -> validate = "true";
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }
        }else if(isset($_GET['email']) and isset($_GET['id']) and !isset($_GET['username'])){
            // if get has username and id
            $email = $_GET['email'];
            $id = $_GET['id'];
            $query = "SELECT DISTINCT EMAIL FROM user_table where ID!=$id AND EMAIL='$email'";
            $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

            $count = mysqli_num_rows($result);
            if($count >= 1){
                //have same username
                $usernameObj = new \stdClass();
                $usernameObj -> validate = "false";
                // $usernameObj -> hello = "hello";
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }else{
                //unique
                $usernameObj = new \stdClass();
                $usernameObj -> validate = 'true';
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }
        }else if(isset($_GET['email']) and !isset($_GET['id']) and !isset($_GET['username'])){
            $email = $_GET['email'];
            $query = "SELECT DISTINCT EMAIL FROM user_table where EMAIL='$email'";
            $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

            $count = mysqli_num_rows($result);
            if($count == 1){
                //have same username
                $usernameObj = new \stdClass();
                // $usernameObj -> hi = "hi";
                $usernameObj -> validate = "false";
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }else{
                //unique
                $usernameObj = new \stdClass();
                $usernameObj -> validate = "true";
                $userJSON = json_encode($usernameObj);
                echo $userJSON;
            }
        }else{
            header('Location: /adminweb/user_manage/?crud_user_validation=GET_ERROR');
            exit();
        }

        break;
    case 'POST':
        //do something
        break;
    default:
        break;
}
