$(document).ready( function() {
    /**
     * Jquery function to call when .edit is clicked to retrieve values from db using
     * ajax call
     */

    $(".edit").click(function showEdit(){
        var user_id = $(this).attr('id').replace('update-', '');

        $.get('crud_user.php', {id : user_id}, function(data){
            var jsondata = JSON.parse(data);
            con = document.getElementById('popBG');
            form1 = document.getElementById('addUser');
            form2 = document.getElementById('EditUser');
            div1 = document.getElementById('changePassword');
            div1.style.display = "block";
            form1.style.display = "none";
            form2.style.display = "block";
            con.style.display = "block";

            $('#editPass').attr('data-uid', user_id);

            $('#editName').val(jsondata.name);
            $('#editUsername').val(jsondata.username);
            $('#editEmail').val(jsondata.email);
            $('#editId').val(jsondata.id);
            $('#editName').attr('data-init', jsondata.name);
            $('#editUsername').attr('data-init', jsondata.username);
            $('#editEmail').attr('data-init', jsondata.email);
        });

    });

    /**
     * Jquery function to call when .deleteBttn is clicked and DELETE data in database
     * using ajax
     */
    $('.deleteBttn').click(function(){
        var user_id = $(this).attr('id').replace('delete-','');
        var url = 'crud_user_update.php?id=' + user_id;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(data){
                alert(data);
                window.location = "";
            },

        });
    });

    /*
        Jquery validation for input username in Adding user
    */
    $('#addUsername').keyup(function(e){
        var val  = $('#addUsername').val().length;
        clearTimeout($.data(this, 'timer'));
        if(val > 50 || val < 4){
            $('#addUsername').attr('data-valid', 'false');
        }else{
            $(this).data('timer', setTimeout(validateAddUser, 500));
        }
    });

    /**
     * Jquery validation for input username in Edit user
     */
    $('#editUsername').keyup(function(e){
        var val = $('#editUsername').val().length;
        clearTimeout($.data(this, 'timer'));
        if(val > 50 || val < 4){
            $('#editUsername').attr('data-valid', 'false');
        }else{
            $(this).data('timer', setTimeout(validateEditUser, 500));
        }
    });

    $('#addEmail').keyup(function(e){
        var val  = $('#addEmail').val().length;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        clearTimeout($.data(this, 'timer'));
        if(!$('#addEmail').val().match(mailformat)){
            $('#addEmail').attr('data-valid', 'false');
        }else{
            $(this).data('timer', setTimeout(validateEmailAddUser, 500));
        }
    });

    $('#editEmail').keyup(function(e){
        var val = $('#editEmail').val().length;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        clearTimeout($.data(this, 'timer'));
        if(!$('#editEmail').val().match(mailformat)){
            $('#editEmail').attr('data-valid', 'false');
        }else{
            $(this).data('timer', setTimeout(validateEmailEditUser, 500));
        }
    });

    /**
     * Jquery form validation submit for Adding User
     */
    $('#addUser').submit(function(e){
        var name = $('#addName').val();
        var username = $('#addUsername').val();
        var password  = $('#addPassword').val();
        var cpassword = $('#confirmAddPassword').val();
        var email = $('#editEmail').val();
        var special_user = specialValid(username);
        var user_passEqual = isEqualValue(username, password);
        if(user_passEqual && name.length > 4 && username.length > 4 && password.length > 4 && name.length < 50 && username.length < 50 && password.length < 50 && password == cpassword && special_user){
            var user_valid = $('#addUsername').attr('data-valid');
            var email_valid = $('#addEmail').attr('data-valid');
            if(user_valid === 'true' && email_valid === 'true'){
                //username is unique
                alert('submitted');
                return true;
            }else if (user_valid === 'false' && email_valid === 'true'){
                alert('Username is not unique');
                return false;
            }else if (user_valid === 'true' && email_valid === 'false'){
                alert('Email is already taken');
                return false;
            }else{
                //username and email has duplicate
                alert('Username is not unique and Email is already taken.');
                return false;
            }
        }else{
            //any of input are either less than 4 or greater than 50
            var error = "";
            if(!user_passEqual){
                error = error + "Username and password must not match \n";
            }
            if(name.length <= 4 || name.length >= 50){
                error = error + "Name must not be less than 4 characters \n";
            }
            if(!special_user){
                error = error + "Username must only contain alpha numeric characters \n";
            }
            if(username.length <= 4 || username.length >= 50){
                error = error + "Username must not be less than 4 characters \n";
            }
            if(password.length <= 4 || password.length >= 50){
                error = error + "Password must not be less than 4 characters";
            }
            if(password != cpassword){
                error = error + "passwords does not match";
            }
            if(email.match(mailformat)){
                error = error + "You have entered an invalid email address";
            }
            alert(error);
            return false;
        }
        return false;
    });

    /**
     * Jquery form validation submit for Editing User Information
     */
    $('#EditUser').submit(function(e){
        var name = $('#editName').val();
        var username = $('#editUsername').val();
        var email = $('#editEmail').val();
        var special_user = specialValid(username);
        if(name.length > 4 && username.length > 4 && name.length < 50 && username.length < 50 && special_user){
            var user_valid = $('#editUsername').attr('data-valid');
            var email_valid = $('#editEmail').attr('data-valid');
            var init_name = $('#editName').attr('data-init');
            var init_user = $('#editUsername').attr('data-init');
            var init_email = $('#editEmail').attr('data-init');
            if(user_valid === 'true' && email_valid === 'true'){
                //username is unique
                if(init_name === name && init_user === username && init_email === email){
                    //Input does not change
                    alert('No information were changed.');
                    return false;
                }else{
                    //Input changes
                    alert('changes saved');
                    return true;
                }
            }else if (user_valid === 'true' && email_valid === 'false'){
              alert('Email is already taken');
              return false;
            }else if (user_valid === 'false' && email_valid === 'true'){
              alert('Username is not unique');
              return false;
            }else{
                //username has duplicate
                alert('Username is not unique and email is already taken');
                return false;
            }
        }else{
            //one of the inputs are either less than 4 or 50 in length
            var error = "";
            if(name.length <= 4 || name.length >= 50){
                error = error + "Name must not be less than 4 characters \n";
            }
            if(!special_user){
                error = error + "Username must only contain alpha numeric characters \n";
            }
            if(username.length <= 4 || username.length >= 50){
                error = error + "Username must not be less than 4 characters";
            }
            if(!email.match(mailformat)){
                error = error + "You have entered an invalid email address";
            }
            alert(error);
            return false;
        }
    });

    /**
     * Jquery function when admin change its password
     */

    $('#btnchangePassword').click(function(e){
        var password = $('#editPass').val();
        var cpassword = $('#cPass').val();

        if(password.length > 4 && password.length < 50 && password == cpassword){
            var user_id = $('#editPass').attr('data-uid');
            var url = 'crud_user_update.php?id=' + user_id + '&password=' +password;
            $.ajax({
                url: url,
                type: 'PUT',
                success: function(data){
                    alert(data);
                    window.location = "";
                }
            });
        }else{
            if(password.length < 4 && password.length > 50){
                alert('Password length must be greater than 4');
            }
            if(password != cpassword){
                alert('passwords does not match');
            }
        }
    });

    $('#addShowPass').click(function(e){
        var checkbox = $('#addShowPass').val();
        var pass = document.getElementById('addPassword');
        var cpass = document.getElementById('confirmAddPassword');
        if (pass.type === "password") {
            pass.type = "text";
            cpass.type = "text";
        } else {
            pass.type = "password";
            cpass.type = "password";
        }
    });

    $('#editShowPass').click(function(e){
        var checkbox = $('#editShowPass').val();
        var pass = document.getElementById('editPass');
        var cpass = document.getElementById('cPass');
        if (pass.type === "password") {
            pass.type = "text";
            cpass.type = "text";
        } else {
            pass.type = "password";
            cpass.type = "password";
        }
    });

// alert(history.length);
    // window.addEventListener("popstate", function(event) {
    //     event.preventDefault();
    //     console.log( 'triggered' );
    //     var r = confirm("Admin will be logged out. Are you sure?");
    //     if (r == true) {
    //         $.ajax({
    //             url: "logout.php" ,
    //             type: "GET",
    //             success : function() {
    //               history.pushState(null, null, 'logout.php');
    //             }
    //         });
    //         // alert("damn its working");
    //     } else {
    //       history.pushState(null, null, window.location.pathname);
    //     }
    //     history.pushState(null, null, window.location.pathname);
    //       // history.pushState(null, null, 'logout.php');
    // }, false);

    //activates popstate (for most browser a pushstate must be called first before a popstate event would be active)
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        var r = confirm("Admin will be logged out. Are you sure?");
        if (r == true) {
          document.getElementById("logoutUser").submit();
        }
    };

});


setTimeout(function(){
  alert("your session has timed-out. Please log in again.")
  for (i = 0; i < 4; i++) {
      setTimeout(location.reload(), 2000);
  }
}, 61000);

/*
    Function to call in validating input username in Edit form
*/
function showPassword() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function validateEditUser(force){
    var val = $('#editUsername').val();
    var id = $('#editId').val();
    var email = $('#editEmail').val();
    if(!force && val.length < 1) return;
    var uUrl = 'crud_user_validation.php?username='+val+'&id='+id;

    $.get(uUrl, function(data){
        var jsondata = JSON.parse(data);
        if(jsondata.validate == "true"){
            //if username is unique
            $('#editUsername').attr('data-valid', 'true');
        }else{
            //if username is taken
            $('#editUsername').attr('data-valid', 'false');
        }

    });
}

function validateEmailEditUser(force){
    var val = $('#editEmail').val();
    var id = $('#editId').val();
    var email = $('#editEmail').val();
    if(!force && val.length < 1) return;
    var eUrl = 'crud_user_validation.php?&id='+id+'&email='+email;

    $.get(eUrl, function(data){
        var jsondata = JSON.parse(data);
        if(jsondata.validate == "true"){
            //if username is unique
            $('#editEmail').attr('data-valid', 'true');
        }else{
            //if username is taken
            $('#editEmail').attr('data-valid', 'false');
        }

    });
}

/*
    Function to call in validating input username in Add form
*/
function validateAddUser(force){
    var val = $('#addUsername').val();
    var email = $('#addEmail').val();
    if(!force && val.length < 1 ) return;
    var uUrl = 'crud_user_validation.php?username='+val;

    $.get(uUrl, function(data){
        var jsondata = JSON.parse(data);
        if(jsondata.validate == "true"){
            //if username is unique
            $('#addUsername').attr('data-valid', 'true');
        }else{
            //if username is taken
            $('#addUsername').attr('data-valid', 'false');
        }
    });
}

function validateEmailAddUser(force){
    var val = $('#addEmail').val();
    var email = $('#addEmail').val();
    if(!force && val.length < 1 ) return;
    var eUrl = 'crud_user_validation.php?&email='+email;

    $.get(eUrl, function(data){
        var jsondata = JSON.parse(data);
        if(jsondata.validate == "true"){
            //if username is unique
            $('#addEmail').attr('data-valid', 'true');
        }else{
            //if username is taken
            $('#addEmail').attr('data-valid', 'false');
        }
    });
}

/**
 * Function to call to show block display for Adding User
 */

function showAdd() {
    con = document.getElementById('popBG');
    form1 = document.getElementById('addUser');
    form2 = document.getElementById('EditUser');
    div1 = document.getElementById('changePassword');
    div1.style.display = "none";
    form1.style.display = "block";
    form2.style.display = "none";
    con.style.display = "block";
}
/**
 * Function call to cancel block display and clear input contents
*/
function Cancel(){
    con = document.getElementById('popBG');
    form1 = document.getElementById('addUser');
    form2 = document.getElementById('EditUser');
    div1 = document.getElementById('changePassword');
    div1.style.display = "none";
    form1.style.display = "none";
    form2.style.display = "none";
    con.style.display = "none";
    $('#editPass').attr('data-uid', '');
    $('input.input').val('');
    $('input.editInput').val('' );
}

/**
 * function to check if value has a special character
 */
function specialValid(val){
    if( /[^a-zA-Z0-9\-\/]/.test(val)) {
        // alert('Input is not alphanumeric');
        return false;
    }
    return true;
}

function isEqualValue(val1, val2){
    if(val1 === val2){
        return false;
    }else{
        return true;
    }
}
