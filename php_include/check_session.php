<?php
    session_start();


    //checks if there is any session available
    if(isset($_SESSION['admin']) && !empty($_SESSION['admin'])){
        //echo 'yes session';
        $_time = time() - $_SESSION['last_login_timestamp'];
        if($_time > 60){
          header("Location: /adminweb/?session=EXPIRED");
          session_destroy();
          exit();
        }
    }else{
        //echo 'no session';
        header("Location: /adminweb/?session=EXPIRED");
        exit();
    }
?>
