<?php
    session_start();


    //checks if there is any session available
    if(!isset($_SESSION['admin']) && empty($_SESSION['admin'])){
        //echo 'yes session';
    }else{
        //echo 'no session';
        header("Location: /adminweb/user_manage?redirect=TRUE");
        exit();
    }
?>

<html>
<head>
  <link rel="stylesheet" type="text/css" href="includes/css/index.css">
</head>
<body>

  <video preload="auto" autoplay="true" loop="loop">
    <source src="includes/src/main_x264.mp4" type="video/mp4" />
    <source src="includes/src/main_VP8.webm" type="video/webm" />
    <source src="includes/src/main_libtheora.ogv" type="video/ogv" />
  </video>
  <br><br><br>
  <div class="container"><br><br><br><br>
    <form id="loginForm" action="login.php" method="POST">
      <img src="includes/src/logo.png"/><span>LIGHTS AND SOCKETS</span><br>
      <?php
      if(isset($_GET['auth'])){
        //get url /?auth=false
        $auth = $_GET['auth'];
        if($auth == 'false'){

          //if user is incorrect
          echo '<span class="uservalidate">Incorrect Username or Password</span><br>';
        }else{
          //do something
        }
      }else{
        //do something
      }
      ?>
      <input class="input" type="text" id="username" name="username" placeholder="USERNAME" required>
      <br><br>
      <input class="input" type="password" id="password" name="password" placeholder="PASSWORD" required>
      <br><br>
      <input id="submit" type="submit" value="LOGIN">
    </form>
  </div>

    <script src="includes/js/jquery-3.3.1.min.js"></script>
    <script src="includes/js/script.js"></script>
</body>
</html>
