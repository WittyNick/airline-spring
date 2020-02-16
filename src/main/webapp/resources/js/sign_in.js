let $inputLogin = $('#login');
let $inputPassword = $('#password');

$('#lang').on('change', function () {
    $.ajax({
        type: 'GET',
        url: '?locale=' + $(this).val(),
        contentType: false,
        success: function () {
            location.reload();
        }
    });
});

$('#buttonSubmit').on('click', function () {
    if (!validate()) {
        return;
    }
    $.ajax({
        type: 'POST',
        url: 'sign/check',
        data: 'login=' + $inputLogin.val() + '&password=' + $inputPassword.val(),
        dataType: "text",
        success: function (userRole) {
            if ("administrator" === userRole) {
                $(location).prop('href', 'administrator');
            } else if('dispatcher' === userRole) {
                $(location).prop('href', 'dispatcher');
            } else {
                $inputPassword.val('');
                $inputLogin.select();
                $messageFail.removeClass('hidden');
            }
        }
    });
});

let $messagePassword = $('#messagePassword');
let $messageLogin =  $('#messageLogin');
let $messageFail = $('#messageFail');

function validate() {
    let isValid = true;
    reset();
    if ('' === $inputPassword.val()) {
        $messagePassword.removeClass('hidden');
        $inputPassword.focus();
        isValid = false;
    }
    if ('' === $inputLogin.val().trim()) {
        $messageLogin.removeClass('hidden');
        $inputLogin.select();
        isValid = false;
    }
    return isValid;
}

function reset() {
    $messagePassword.addClass('hidden');
    $messageLogin.addClass('hidden');
    $messageFail.addClass('hidden');
}