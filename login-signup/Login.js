$(document).ready(function() {
    $('#togglePassword').click(function() {
        $(this).toggleClass('open');
        $(this).toggleClass('fa-eye-slash fa-eye');
        if ($(this).hasClass('open')) {
            $(this).prev().attr('type', 'text');
           // alert('Please type your password');

        } else {
            $(this).prev().attr('type', 'password');
        }
    });
});
 