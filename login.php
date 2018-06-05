<?php
    session_start();

    //get required file
    require_once(__DIR__."/php_include/db_connect.php");

    //checks if value is set on POST
    if(isset($_POST['username']) and isset($_POST['password'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        if(strlen($username) > 4 && strlen($username) < 50 && strlen($password) > 4 && strlen($password) < 50 && ctype_alnum($username)){
            $hashed_password = crypt($password, $salt_key);
            $query = "SELECT DISTINCT USERNAME, PASSWORD FROM user_table where id='1' AND username='$username' AND password='$hashed_password'";

            //gets result from query getting the first id and username and password
            $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

            //checks count for user
            $count = mysqli_num_rows($result);
            if($count == 1){
                $_SESSION['admin'] = $username;
                $_SESSION['last_login_timestamp'] = time();
                header("Location: /adminweb/user_manage");
                exit();
            }else{
                //redirect to index
                header("Location: /adminweb/?auth=false");
                exit();
            }
        }else{
            header("Location: /adminweb/?auth=falseeee");
            exit();
        }

        // echo 'Hello ' . $count;
    }else{
        header("Location: /adminweb/?auth=false");
        exit();
    }
