$(document).ready(function() {
    /**
     * function to validate login form
     */
    $('#loginForm').submit(function(e){
        var username = $('#username').val();
        var password = $('#password').val();
        var special_user = specialValid(username);
        if(special_user && username.length > 4 && password.length > 4 && username.length < 50 && password.length < 50){
            // alert('Hello');
            return true;
        }else{
            // alert('ulul');
            window.location = "?auth=false";
            return false;
        }
    })
});
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