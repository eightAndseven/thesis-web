<?php
    session_start();


    //checks if there is any session available
    if(isset($_SESSION['admin']) && !empty($_SESSION['admin'])){
        //echo 'yes session';
    }else{
        //echo 'no session';
        header("Location: /adminweb/?session=EXPIRED");
        exit();
    }
?>