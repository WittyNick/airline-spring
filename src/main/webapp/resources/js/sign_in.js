let inputLogin = $('#login');
let inputPassword = $('#password');

loadErrorMessages();

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
        url: 'signin',
        data: 'login=' + $(inputLogin).val() + '&password=' + $(inputPassword).val(),
        dataType: "text",
        success: onSignInAction
    });
});

function onSignInAction(userRole) {
    if ('administrator' === userRole) {
        $(location).prop('href', 'administrator');
    } else if ('dispatcher' === userRole) {
        $(location).prop('href', 'dispatcher');
    } else {
        $(inputPassword).val('');
        $(inputLogin).select();
        $('#messageFail').html(dict['message.sign_in.fail']);
    }
}

function validate() {
    let isValid = true;
    if ('' === $(inputPassword).val()) {
        $('#messagePassword').html(dict['message.sign_in.password']);
        $(inputPassword).focus();
        isValid = false;
    }
    if ('' === $(inputLogin).val().trim()) {
        $('#messageLogin').html(dict['message.sign_in.login']);
        inputLogin.select();
        isValid = false;
    }
    $('#messageFail').html('');
    return isValid;
}

let dict;

function loadErrorMessages() {
    let words = [
        'message.sign_in.login',
        'message.sign_in.password',
        'message.sign_in.fail'
    ];
    $.ajax({
        type: 'POST',
        url: 'locale',
        data: JSON.stringify(words),
        contentType: 'json',
        dataType: 'json',
        success: function (map) {
            dict = map;
        }
    });
}