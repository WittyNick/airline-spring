let dict;
let messages;

// ---------- administrator.jsp ----------
function localizeAdministrator() {
    let words = [
        'lang',
        'main',
        'administrator',
        'sign_out',
        'flights',
        'number',
        'from',
        'to',
        'departure_date',
        'departure_time',
        'arrival_date',
        'arrival_time',
        'plane',
        'crew',
        'flight.edit',
        'flight.add',
        'flight.delete',
        'flight.confirm.delete'
    ];
    $.ajax({
        type: 'POST',
        url: 'locale',
        data: JSON.stringify(words),
        contentType: 'json',
        dataType: 'json',
        success: applyLocaleAdministrator
    });
}

function applyLocaleAdministrator(response) {
    dict = response;
    setLocaleSelector();

    $('#mainTab').children().eq(0).html(dict['main']);
    $('#administratorTab').html(dict['administrator']);
    $('#sign').children().eq(0).html(dict['sign_out']);
    $('#content').attr('lang', dict['lang']);
    $('#tableCaption').html(dict['flights']);

    let $headColumns = $('#hatRow').children();
    $headColumns.eq(1).html(dict['number']);
    $headColumns.eq(2).html(dict['from']);
    $headColumns.eq(3).html(dict['to']);
    $headColumns.eq(4).html(dict['departure_date']);
    $headColumns.eq(5).html(dict['departure_time']);
    $headColumns.eq(6).html(dict['arrival_date']);
    $headColumns.eq(7).html(dict['arrival_time']);
    $headColumns.eq(8).html(dict['plane']);
    $headColumns.eq(10).html(dict['crew']);
    $('#buttonEdit').val(dict['flight.edit']);
    $('#buttonAdd').val(dict['flight.add']);
    $('#buttonDelete').val(dict['flight.delete']);
}

// ---------- flight_edit.jsp ----------
function localizeFlightEdit() {
    let words = [
        'lang',
        'main',
        'administrator',
        'sign_out',
        'flight.edit.number',
        'flight.edit.from',
        'flight.edit.to',
        'flight.edit.departure_date',
        'flight.edit.departure_time',
        'flight.edit.arrival_date',
        'flight.edit.arrival_time',
        'flight.edit.plane',
        'flight.edit.save',
        'flight.edit.cancel',
        'message.flight.edit.fill_field',
        'message.flight.edit.illegal_value',
        'message.flight.edit.fill_date_time'
    ];
    $.ajax({
        type: 'POST',
        url: 'locale',
        data: JSON.stringify(words),
        contentType: 'json',
        dataType: 'json',
        success: applyFlightEdit
    });
}

function applyFlightEdit(response) {
    dict = response;
    setLocaleSelector();

    $('#mainTab').children().first().html(dict['main']);
    $('#administratorTab').html(dict['administrator']);
    $('#sign').children().first().html(dict['sign_out']);
    $('#content').attr('lang', dict['lang']);
    $('#labelFlightNumber').html(dict['flight.edit.number']);
    $('#labelStartPoint').html(dict['flight.edit.from']);
    $('#labelDestinationPoint').html(dict['flight.edit.to']);
    $('#labelDepartureDate').html(dict['flight.edit.departure_date']);
    $('#labelDepartureTime').html(dict['flight.edit.departure_time']);
    $('#labelArrivalDate').html(dict['flight.edit.arrival_date']);
    $('#labelArrivalTime').html(dict['flight.edit.arrival_time']);
    $('#labelPlane').html(dict['flight.edit.plane']);
    $('#buttonSave').val(dict['flight.edit.save']);
    $('#buttonCancel').val(dict['flight.edit.cancel']);

    messages = [
        "",
        dict['message.flight.edit.fill_field'],
        dict['message.flight.edit.illegal_value'],
        dict['message.flight.edit.fill_date_time']
    ];
    showErrorMessages();
}

// ---------- dispatcher.jsp ----------
function localizeDispatcher() {
    let words = [
        'lang',
        'main',
        'dispatcher',
        'sign_out',
        'crews',
        'number',
        'from',
        'to',
        'departure_date',
        'departure_time',
        'arrival_date',
        'arrival_time',
        'plane',
        'crew',
        'crew.edit',
        'crew.delete',
        'crew.confirm.delete'
    ];
    $.ajax({
        type: 'POST',
        url: 'locale',
        data: JSON.stringify(words),
        contentType: 'json',
        dataType: 'json',
        success: applyLocaleDispatcher
    });
}

function applyLocaleDispatcher(response) {
    dict = response;
    setLocaleSelector();

    $('#mainTab').children().first().html(dict['main']);
    $('#dispatcherTab').html(dict['dispatcher']);
    $('#sign').children().first().html(dict['sign_out']);
    $('#content').attr('lang', dict['lang']);
    $('#tableCaption').html(dict['crews']);
    let $headColumns = $('#hatRow').children();
    $headColumns.eq(1).html(dict['number']);
    $headColumns.eq(2).html(dict['from']);
    $headColumns.eq(3).html(dict['to']);
    $headColumns.eq(4).html(dict['departure_date']);
    $headColumns.eq(5).html(dict['departure_time']);
    $headColumns.eq(6).html(dict['arrival_date']);
    $headColumns.eq(7).html(dict['arrival_time']);
    $headColumns.eq(8).html(dict['plane']);
    $headColumns.eq(10).html(dict['crew']);
    $('#buttonEdit').val(dict['crew.edit']);
    $('#buttonDelete').val(dict['crew.delete']);
}

// ---------- crew_edit.jsp ----------
function localizeCrewEdit() {
    let words = [
        'lang',
        'main',
        'dispatcher',
        'sign_out',
        'crew.edit.crew_name',
        'crew.edit.employee_list',
        'crew.edit.employee_base',
        'name',
        'surname',
        'position',
        'pilot',
        'navigator',
        'communicator',
        'stewardess',
        'crew.edit.name',
        'crew.edit.surname',
        'crew.edit.position',
        'crew.edit.remove_from_crew',
        'crew.edit.engage_employee',
        'crew.edit.add_to_crew',
        'crew.edit.fire_employee',
        'crew.edit.save',
        'crew.edit.cancel',
        'crew.edit.confirm.fire_employee',
        'message.crew.edit.enter_crew_name',
        'message.crew.edit.enter_employee_name',
        'message.crew.edit.enter_employee_surname',
        'message.crew.edit.enter_employee_name_and_surname'
    ];
    $.ajax({
        type: 'POST',
        url: 'locale',
        data: JSON.stringify(words),
        contentType: 'json',
        dataType: 'json',
        success: applyCrewEdit
    });
}

function applyCrewEdit(response) {
    dict = response;
    setLocaleSelector();

    $('#mainTab').children().first().html(dict['main']);
    $('#dispatcherTab').html(dict['dispatcher']);
    $('#sign').children().first().html(dict['sign_out']);
    $('#content').attr('lang', dict['lang']);
    $('#labelName').html(dict['crew.edit.crew_name']);
    $('#captionEmployeeList').html(dict['crew.edit.employee_list']);
    $('#captionEmployeeBase').html(dict['crew.edit.employee_base']);
    let $headEmployeeListColumns = $('#hatEmployeeListRow').children();
    $headEmployeeListColumns.eq(1).html(dict['name']);
    $headEmployeeListColumns.eq(2).html(dict['surname']);
    $headEmployeeListColumns.eq(4).html(dict['position']);
    let $headEmployeeBaseColumns = $('#hatEmployeeBaseRow').children();
    $headEmployeeBaseColumns.eq(1).html(dict['name']);
    $headEmployeeBaseColumns.eq(2).html(dict['surname']);
    $headEmployeeBaseColumns.eq(4).html(dict['position']);
    $('#labelNewEmployeeName').html(dict['crew.edit.name']);
    $('#labelNewEmployeeSurname').html(dict['crew.edit.surname']);
    $('#labelNewEmployeePosition').innerText = dict['crew.edit.position'];
    $('#buttonRemoveFromCrew').val(dict['crew.edit.remove_from_crew']);
    $('#buttonEngageEmployee').val(dict['crew.edit.engage_employee']);
    $('#buttonAddToCrew').val(dict['crew.edit.add_to_crew']);
    $('#buttonFireEmployee').val(dict['crew.edit.fire_employee']);
    $('#buttonSave').val(dict['crew.edit.save']);
    $('#buttonCancel').val(dict['crew.edit.cancel']);

    $('#employeeListBody').children().each(function (index, row) {
        let $positions = $(row).children();
        $positions.eq(4).html(dict[$positions.eq(3).html().toLowerCase()]);
    });
    $('#employeeBaseBody').children().each(function (index, row) {
        let $positions = $(row).children();
        $positions.eq(4).html(dict[$positions.eq(3).html().toLowerCase()]);
    });
    $('#newEmployeePosition').children().each(function (index, option) {
        $(option).html(dict[$(option).val().toLowerCase()]);
    });

    messages = [
        '',
        dict['message.crew.edit.enter_crew_name'],
        dict['message.crew.edit.enter_employee_name'],
        dict['message.crew.edit.enter_employee_surname'],
        dict['message.crew.edit.enter_employee_name_and_surname']
    ];
    showErrorMessages();
}