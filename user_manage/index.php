<?php require_once(__DIR__."/../php_include/check_session.php"); ?>
<?php require_once(__DIR__."/../php_include/db_connect.php");?>
<?php
    /**
     * get user information from database
     */
    $query = "SELECT DISTINCT ID, NAME, USERNAME FROM user_table WHERE id!=1";
    $user_result = mysqli_query($connection, $query) or die(mysqli_error($connection));
    $user_count = mysqli_num_rows($user_result);
?>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../includes/css/main.css">
    </head>
<body>
    <div id="header">
        <form id="logoutUser" action="logout.php" method="POST"><input type="hidden" name="logout" value="logout">
            <input type="submit" value="LOGOUT"/>
        </form>
    </div>
    <!-- #header -->
    <div class="container">
        <img id="logo" src="../includes/src/logo.png"/>
        <div>
            <p>User Count: <span id="user_count"><?php echo $user_count; ?></span>/5</p>
        </div>
        <div id="WholeUserContainer" >
            <?php
            /**
             * loop to get rows from result query
             */
            while($row = $user_result->fetch_assoc()){
                echo '<div class="UserContainer"><div class="UserName"><br><input id="user-'. $row['ID'] .'" class="userNameVal" name="username" value="'. $row['NAME'] .'" disabled></div>'.
                '<button id="update-'. $row['ID'] .'" class="edit"><img src="../includes/src/edit.png"></button>'.
                '<button id="delete-'. $row['ID'] .'" class="deleteBttn" type="submit"><img src="../includes/src/delete.png"></button>'.
                '</div>';
            }
            ?>
        </div>
        <!-- #WholeUserContainer -->

        <?php
            //check if user is user is greater or equal to 5
            if($user_count >= 5){
                //do something
            }else{
                echo '<button id="addUserBttn" onclick="javascript:showAdd();">ADD USER</button>';
            }
        ?>
    </div>
    <!-- .container -->

    <div id="popBG">
        <div id="formCon">
            <form action="crud_user.php" method="POST" id="addUser" autocomplete="off">
                <div>ADD USER</div>
                NAME:
                <input class="input" id="addName" type="text" name="name" required>
                USERNAME:
                <input class="input" id="addUsername" type="text" data-valid="false" name="username" required>
                EMAIL:
                <input class="input" id="addEmail" type="text" data-valid="false" name="email" required>
                PASSWORD:
                <input class="input" id="addPassword" type="password" name="password" required>
                CONFIRM PASSWORD:
                <input class="input" id="confirmAddPassword" type="password" name="cpassword" required>
                <input id="addShowPass" type="checkbox"/> <span>SHOW PASSWORD</span>
                <div class="SCCon">
                    <input id="submitBttn" type="submit" value="CREATE">
                    <input id="cancelBttn" type="button" value="CANCEL" onclick="javascript:Cancel();">
                </div>
                <!-- .SCCon -->
            </form>
            <!-- #addUser -->
            <form action="crud_user_update.php" method="POST" id="EditUser" autocomplete="off">
                <input type="hidden" id="editId" name="id" required>
                <div>EDIT USER</div>
                NAME:
                <input class="editInput" id="editName" type="text" name="name" required>
                USERNAME:
                <input class="editInput" id="editUsername" type="text" data-valid="true" name="username" required>
                EMAIL:
                <input class="editInput" id="editEmail" type="text" data-valid="true" name="email" required>
                <div class="SCCon">
                    <input id="submitBttn" type="submit" value="UPDATE">
                    <input id="cancelBttn" type="button" value="CANCEL" onclick="javascript:Cancel();">
                </div>
                <!-- .SCCon -->
            </form>
            <!-- #EditUser -->
            <div id="changePassword" style="margin-top:25;">
                PASSWORD:
                <input class="editInput" id="editPass" type="password" name="password" autocomplete="off" data-uid="">
                CONFIRM PASSWORD:
                <input class="editInput" id="cPass" type="password" name="password" autocomplete="off" data-uid="">
                <input id="editShowPass" type="checkbox"> <span>SHOW PASSWORD</span>
                <div id="CPCon">
                    <input type="submit" id="btnchangePassword" value="CHANGE PASSWORD">
                </div>
            </div>
            <!--
            <form>
                PASSWORD:
                <input class="editInput" id="editPass" type="password" name="password" required>
                CONFIRM PASSWORD:
                <input class="editInput" id="editPass" type="password" name="password" required>

                <div class="SCCon">
                    <input id="submitBttn" type="submit" value="UPDATE">
                    <input id="cancelBttn" type="button" value="CANCEL" onclick="javascript:Cancel();">
                </div>
            </form>
            -->
        </div>
        <!-- #formCon -->
    </div>
    <!-- #popBG -->

    <noscript>
      <h1>Pleas enable javascript to view the website.</h1>
    </noscript>

    <!--scripts for javascript-->
    <script src="../includes/js/jquery-3.3.1.min.js"></script>
    <script src="../includes/js/scripts.js"></script>

</body>
</html>
