$('#lang').on('change', function () {
    $.ajax({
        type: 'GET',
        url: '..?locale=' + $(this).val(),
        contentType: false,
        success: function () {
            location.reload();
        }
    });
});

function onSaveClick() {
    if (!validate()) {
        return;
    }
    let flight = {
        'id': +$('#id').val(),
        'flightNumber': +$('#flightNumber').val(),
        'startPoint': $('#startPoint').val(),
        'destinationPoint': $('#destinationPoint').val(),
        'departureDate': $('#departureDate').val(),
        'departureTime': $('#departureTime').val(),
        'arrivalDate': $('#arrivalDate').val(),
        'arrivalTime': $('#arrivalTime').val(),
        'plane': $('#plane').val(),
        'crew': {
            'id': +$('#crewId').val()
        }
    };
    $.ajax({
        type: 'POST',
        url: '../administrator/save',
        data: JSON.stringify(flight),
        contentType: 'application/json; charset=UTF-8',
        success: function () {
            $(location).prop('href', '../administrator');
        }
    });
}

function signOut() {
    $.ajax({
        type: 'POST',
        url: '../sign/out',
        contentType: false,
        success: function () {
            $(location).prop('href', '../');
        }
    });
}

function validate() {
    let isValid = true;
    resetMessages();

    let $flightNumber = $('#flightNumber');
    if ('' === $flightNumber.val().trim()) {
        $messageFlightNumberEmpty.removeClass('hidden');
        isValid = false;
    } else if (!/[0-9]/.test($flightNumber.val())) {
        $messageFlightNumberIllegal.removeClass('hidden');
        isValid = false;
    }

    if ('' === $('#startPoint').val().trim()) {
        $messageStartPoint.removeClass('hidden');
        isValid = false;
    }

    if ('' === $('#destinationPoint').val().trim()) {
        $messageDestinationPoint.removeClass('hidden');
        isValid = false;
    }

    if ('' === $('#departureDate').val() || '' === $('#departureTime').val()) {
        $messageDepartureDateTime.removeClass('hidden');
        isValid = false;
    }

    if ('' === $('#arrivalDate').val() || '' === $('#arrivalTime').val()) {
        $messageArrivalDateTime.removeClass('hidden');
        isValid = false;
    }

    if ('' === $('#plane').val()) {
        $messagePlane.removeClass('hidden');
        isValid = false;
    }
    return isValid;
}

let $messageFlightNumberEmpty = $('#messageFlightNumberEmpty');
let $messageFlightNumberIllegal = $('#messageFlightNumberIllegal');
let $messageStartPoint = $('#messageStartPoint');
let $messageDestinationPoint = $('#messageDestinationPoint');
let $messageDepartureDateTime = $('#messageDepartureDateTime');
let $messageArrivalDateTime = $('#messageArrivalDateTime');
let $messagePlane = $('#messagePlane');

function resetMessages() {
    $messageFlightNumberEmpty.addClass('hidden');
    $messageFlightNumberIllegal.addClass('hidden');
    $messageStartPoint.addClass('hidden');
    $messageDestinationPoint.addClass('hidden');
    $messageDepartureDateTime.addClass('hidden');
    $messageArrivalDateTime.addClass('hidden');
    $messagePlane.addClass('hidden');
}