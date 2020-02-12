$(document).ready(function() {
    setUserRolePageView();
    $('#lang').on('change', changeLocaleEventHandler);
});

function setUserRolePageView() {
    $.ajax({
        type: 'POST',
        url: 'user/validate',
        contentType: false,
        dataType: 'text',
        success: function (responseText) {
            let $spans = $('#sign').children();
            if ('administrator' === responseText) {
                $spans.eq(1).removeClass('hidden');
                $('#administratorTab').removeClass('hidden');
            } else if ('dispatcher' === responseText) {
                $spans.eq(1).removeClass('hidden');
                $('#dispatcherTab').removeClass('hidden');
            } else { // 'guest'
                $spans.eq(0).removeClass('hidden');
            }
        }
    });
}

function changeLocaleEventHandler() {
    $.ajax({
        type: 'GET',
        url: '?locale=' + $('#lang').val(),
        contentType: false,
        success: function () {
            location.reload();
        }
    });
}

function signOut() {
    $.ajax({
        type: 'POST',
        url: 'signout',
        contentType: false,
        success: function () {
            let $spans = $('#sign').children();
            $spans.eq(1).addClass('hidden');
            $spans.eq(0).removeClass('hidden');
            $('#administratorTab').addClass('hidden');
            $('#dispatcherTab').addClass('hidden');
        }
    });
}