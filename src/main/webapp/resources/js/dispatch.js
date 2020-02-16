let selectedRow = null;

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

$('#tableBody').children().each(function (index, row) {
    $(row).on('click', function () {
        if (selectedRow != null) {
            $(selectedRow).removeClass('selected');
        }
        $(this).addClass('selected');
        selectedRow = this;
    });
});

function onEditClick() {
    if (selectedRow == null) {
        return;
    }
    let flightId = $(selectedRow).children().eq(0).html();
    let crewId = $(selectedRow).children().eq(9).html();
    $('#flightId').attr('value', flightId);
    $('#crewId').attr('value', crewId);
    $('#formEdit').submit();
}

function onDeleteClick() {
    if (selectedRow == null) {
        return;
    }
    let $selectedFlightCells = $(selectedRow).children();
    let crewId = +$selectedFlightCells.eq(9).html();
    if (crewId === 0 || !confirm($('#confirmDelete').html())) {
        return;
    }
    let flight = {
        'id': +$selectedFlightCells.eq(0).html(),
        'flightNumber': +$selectedFlightCells.eq(1).html(),
        'startPoint': $selectedFlightCells.eq(2).html(),
        'destinationPoint': $selectedFlightCells.eq(3).html(),
        'departureDate': $selectedFlightCells.eq(4).html(),
        'departureTime': $selectedFlightCells.eq(5).html(),
        'arrivalDate': $selectedFlightCells.eq(6).html(),
        'arrivalTime': $selectedFlightCells.eq(7).html(),
        'plane': $selectedFlightCells.eq(8).html(),
        'crew': {
            'id': crewId
        }
    };
    $.ajax({
        type: 'POST',
        url: 'dispatcher/delete',
        data: JSON.stringify(flight),
        contentType: 'application/json; charset=UTF-8',
        success: function () {
            let $selectedFlightCells = $(selectedRow).children();
            $selectedFlightCells.eq(9).html('0');
            $selectedFlightCells.eq(10).html('');
        }
    });
}

function signOut() {
    $.ajax({
        type: 'POST',
        url: 'sign/out',
        contentType: false,
        success: function () {
            $(location).prop('href', './');
        }
    });
}