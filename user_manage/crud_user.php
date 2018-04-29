<?php
require_once(__DIR__."/../php_include/check_session.php");
require_once(__DIR__."/../php_include/db_connect.php");


$method = $_SERVER["REQUEST_METHOD"];

//switch case to get HTTP method
switch($method){
    case 'GET':
        /**
         * Get user information using AJAX call from Jquery
         */
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $query = "SELECT DISTINCT id, name, username, email FROM user_table where id='$id'";
            $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
            $data = $result->fetch_assoc();
            echo json_encode($data);
        }else{
            //do something
        }

        break;
    case 'POST':

        /**
         * POST from index.php #addUser
         */
        if(isset($_POST['name']) and isset($_POST['username']) and isset($_POST['password']) and isset($_POST['email'])){
            $name = $_POST['name'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];

            /**
             * validation form
             */
            if((strlen($name) > 4 && strlen($name) < 50) && (strlen($username) > 4 && strlen($username) < 50) && (strlen($password) > 4 && strlen($password) < 50) && filter_var($email, FILTER_VALIDATE_EMAIL)){
                /**
                 * Validation for username
                 */
                $query_username = "SELECT DISTINCT USERNAME FROM user_table WHERE username='$username'";
                $result_username = mysqli_query($connection, $query_username) or die(mysqli_error($connection));
                $count_username = mysqli_num_rows($result_username);
                if($count_username >= 1){
                    //if user has duplicate username
                    header('Location: /adminweb/user_manage/?add_user=ERROR');
                    exit();
                }else{
                    //if user has unique username

                    //hashes password and save to database
                    $hashed_password = crypt($password, $salt_key);
                    $sql = "INSERT INTO user_table (name, username, password, email) VALUES ('$name', '$username', '$hashed_password', '$email')";
                    if(mysqli_query($connection, $sql)){
                        header('Location: /adminweb/user_manage/?crud_user=addedsuccessfully');
                        exit();
                    }else{
                        echo "Error " . mysqli_error($connection);
                    }
                }
            }else{
                header('Location: /adminweb/user_manage/?crud_user=Error_validation');
                exit();
            }

        }else{
            header('Location: /adminweb/user_manage/?crud_user=POST_ERROR');
            exit();
        }

        break;
    default:
        break;
}
