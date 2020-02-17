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
    let selectedFlightId = $(selectedRow).children().eq(0).html();
    $('#flightId').attr('value', selectedFlightId);
    $('#formEdit').submit();
}

function onAddClick() {
    $('#flightId').attr('value', '0');
    $('#formEdit').submit();
}

function onDeleteClick() {
    if (selectedRow == null || !confirm(dict['confirmDelete'])) {
        return;
    }
    let $selectedFlightCells = $(selectedRow).children();
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
            'id': +$selectedFlightCells.eq(9).html()
        }
    };
    $.ajax({
        type: 'POST',
        url: 'administrator/delete',
        data: JSON.stringify(flight),
        contentType: 'application/json; charset=UTF-8',
        success: function () {
            $(selectedRow).remove();
            selectedRow = null;
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