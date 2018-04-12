<?php
    session_start();

    //checks if there is a session
    if(isset($_SESSION['admin']) && !empty($_SESSION['admin'])){

        //checks if there is a POST logout
        if(isset($_POST['logout'])){
            $logout = $_POST['logout'];

            //checks if logout is equal to logout
            if($logout == "logout"){

                //session destroyed
                session_destroy();
                header('Location: /adminweb/?logout=YES');
                exit();
            }else{
                header('Location: /adminweb/user_manage/?bad_logout=YES');
                exit();
            }
        }else{
            header('Location: /adminweb/user_manage/?bad_logout=YES');
            exit();
        }
    }else{
        header("Location: /adminweb/?session=EXPIRED");
        exit();
    }

?>