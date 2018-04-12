<?php
    //get connection
    $connection = mysqli_connect('localhost', 'root', '', 'powerboard');
    if (!$connection){
        die("Database Connection Failed" . mysqli_error($connection));
    }

    //salt key for HASHING using MD5
    $salt_key = '$1$P0w3rbo@$';
