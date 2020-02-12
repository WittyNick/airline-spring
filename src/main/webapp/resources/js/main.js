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