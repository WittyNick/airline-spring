let selectedCrewRow = null;
let selectedBaseRow = null;

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

let $employeeListBody = $('#employeeListBody');
let $employeeBaseBody = $('#employeeBaseBody');

$employeeListBody.children().each(function (index, row) {
    $(row).on('click', onEmployeeListRowClick);
});

$employeeBaseBody.children().each(function (index, row) {
    $(row).on('click', onEmployeeBaseRowClick);
});

function onEmployeeListRowClick() {
    if (selectedCrewRow != null) {
        $(selectedCrewRow).removeClass('selected');
    }
    $(this).addClass('selected');
    selectedCrewRow = this;
}

function onEmployeeBaseRowClick() {
    if (selectedBaseRow != null) {
        $(selectedBaseRow).removeClass('selected');
    }
    $(this).addClass('selected');
    selectedBaseRow = this;
}

function onRemoveFromCrewClick() {
    if (selectedCrewRow == null) {
        return;
    }
    if (selectedBaseRow != null) {
        $(selectedBaseRow).removeClass('selected');
    }
    $(selectedCrewRow).off('click');
    $(selectedCrewRow).detach();
    $employeeBaseBody.append(selectedCrewRow);
    $(selectedCrewRow).on('click', onEmployeeBaseRowClick);
    selectedBaseRow = selectedCrewRow;
    selectedCrewRow = null;
}

function onAddToCrewClick() {
    if (selectedBaseRow == null) {
        return;
    }
    if (selectedCrewRow != null) {
        $(selectedCrewRow).removeClass('selected');
    }
    $(selectedBaseRow).off('click');
    $(selectedBaseRow).detach();
    $employeeListBody.append(selectedBaseRow);
    $(selectedBaseRow).on('click', onEmployeeListRowClick);
    selectedCrewRow = selectedBaseRow;
    selectedBaseRow = null;
}

function engageEmployeeAction() {
    if (!validateNewEmployee()) {
        return;
    }
    let employee = {
        'id': 0,
        'name': $('#newEmployeeName').val(),
        'surname': $('#newEmployeeSurname').val(),
        'position': $('#newEmployeePosition').val()
    };
    $.ajax({
        type: 'POST',
        url: 'employee/add',
        data: JSON.stringify(employee),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: onEngageEmployeeCallback
    });
}

function onEngageEmployeeCallback(employee) {
    let $row = $('<tr>').on('click', onEmployeeListRowClick);
    let cells = '<td>' + employee.id +
        '</td><td>' + employee.name +
        '</td><td>' + employee.surname +
        '</td><td>' + employee.position +
        '</td><td>' + dict[employee.position.toLowerCase()] + '</td>';

    $row.html(cells);
    $employeeListBody.append($row);
    $row.click();

    $('#newEmployeeName').val('');
    $('#newEmployeeSurname').val('');
}

function fireEmployeeAction() {
    if (selectedBaseRow == null || !confirm($('#confirmFireEmployee').html())) {
        return;
    }
    let $cells = $(selectedBaseRow).children();
    let employee = {
        'id': $cells.eq(0).html(),
        'name': $cells.eq(1).html(),
        'surname': $cells.eq(2).html(),
        'position': $cells.eq(3).html()
    };
    $.ajax({
        type: 'POST',
        url: 'employee/delete',
        data: JSON.stringify(employee),
        contentType: 'application/json; charset=UTF-8',
        success: function () {
            $(selectedBaseRow).remove();
            selectedBaseRow = null;
        }
    });
}

function saveAction() {
    if (!validateCrew()) {
        return;
    }
    let bobtailFlight = {
        'id': $('#flightId').val(),
        'crew': {
            'id': $('#crewId').val(),
            'name': $('#name').val(),
            'employees': []
        }
    };
    $employeeListBody.children().each(function (index, row) {
        let $cells = $(row).children();
        let employee = {
            'id': $cells.eq(0).html(),
            'name': $cells.eq(1).html(),
            'surname': $cells.eq(2).html(),
            'position': $cells.eq(3).html()
        };
        bobtailFlight.crew.employees.push(employee);
    });
    $.ajax({
        type: 'POST',
        url: 'save',
        data: JSON.stringify(bobtailFlight),
        contentType: 'application/json; charset=UTF-8',
        success: function () {
            $(location).prop('href', '../dispatcher');
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

let messageCrewNameIndex = 0;
let messageNewEmployeeIndex = 0;

function validateCrew() {
    let isValid = true;
    if ('' === $('#name').val().trim()) {
        messageCrewNameIndex = 1;
        isValid = false;
    } else {
        messageCrewNameIndex = 0;
    }
    showErrorMessages();
    return isValid;
}

function validateNewEmployee() {
    let isValid = true;
    let $newEmployeeName = $('#newEmployeeName');
    let $newEmployeeSurname = $('#newEmployeeSurname');
    if ('' === $newEmployeeName.val().trim() && '' === $newEmployeeSurname.val().trim()) {
        messageNewEmployeeIndex = 4;
        isValid = false;
    } else if ('' === $newEmployeeName.val().trim()) {
        messageNewEmployeeIndex = 2;
        isValid = false;
    } else if ('' === $newEmployeeSurname.val().trim()) {
        messageNewEmployeeIndex = 3;
        isValid = false;
    } else {
        messageNewEmployeeIndex = 0;
    }
    $('#messageNewEmployee').html(messages[messageNewEmployeeIndex]);

    setTimeout(function () {
        messageNewEmployeeIndex = 0;
        $('#messageNewEmployee').html(messages[messageNewEmployeeIndex]);
    }, 2000);
    return isValid;
}

function showErrorMessages() {
    $('#messageName').html(messages[messageCrewNameIndex]);
}