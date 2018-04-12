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
            $('#editId').val(jsondata.id);
            $('#editName').attr('data-init', jsondata.name);
            $('#editUsername').attr('data-init', jsondata.username);
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
            }
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

    /**
     * Jquery form validation submit for Adding User
     */
    $('#addUser').submit(function(e){
        var name = $('#addName').val();
        var username = $('#addUsername').val();
        var password  = $('#addPassword').val();
        var special_user = specialValid(username);
        var user_passEqual = isEqualValue(username, password);
        if(user_passEqual && name.length > 4 && username.length > 4 && password.length > 4 && name.length < 50 && username.length < 50 && password.length < 50 && special_user){
            var user_valid = $('#addUsername').attr('data-valid');
            if(user_valid === 'true'){
                //username is unique
                alert('submitted');
                return true;
            }else{
                //username has duplicate
                alert('Username is not unique');
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
        var special_user = specialValid(username);
        var user_passEqual = isEqualValue(username, password);
        if(user_passEqual && name.length > 4 && username.length > 4 && name.length < 50 && username.length < 50 && special_user){
            var user_valid = $('#editUsername').attr('data-valid');
            var init_name = $('#editName').attr('data-init');
            var init_user = $('#editUsername').attr('data-init');
            if(user_valid === 'true'){
                //username is unique
                if(init_name === name && init_user === username){
                    //Input does not change
                    alert('No information were changed.');
                    return false;
                }else{
                    //Input changes
                    return true;
                }
            }else{
                //username has duplicate
                alert('Username is not unique');
                return false;
            }
        }else{
            //one of the inputs are either less than 4 or 50 in length
            var error = "";
            if(!user_passEqual){
                error = error + "Username and Password must not match \n"
            }
            if(name.length <= 4 || name.length >= 50){
                error = error + "Name must not be less than 4 characters \n";
            }
            if(!special_user){
                error = error + "Username must only contain alpha numeric characters \n";
            }
            if(username.length <= 4 || username.length >= 50){
                error = error + "Username must not be less than 4 characters";
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

        if(password.length > 4 && password.length < 50){
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
            alert('Password length must be greater than 4');
        }
    })
});
/*
    Function to call in validating input username in Edit form
*/
function validateEditUser(force){
    var val = $('#editUsername').val();
    var id = $('#editId').val();
    if(!force && val.length < 1) return;
    var url = 'crud_user_validation.php?username='+val+'&id='+id;
    $.get(url, function(data){
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

/*
    Function to call in validating input username in Add form
*/
function validateAddUser(force){
    var val = $('#addUsername').val();
    if(!force && val.length < 1 ) return;
    var url = 'crud_user_validation.php?username='+val;
    
    $.get(url, function(data){
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