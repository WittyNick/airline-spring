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

function onEngageEmployeeClick() {
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
        success: function () {
            let $row = $('<tr>').on('click', onEmployeeListRowClick);
            let cells = '<td>' + employee.id +
                '</td><td>' + employee.name +
                '</td><td>' + employee.surname +
                '</td><td>' + employee.position +
                '</td><td>' + dict[employee.position] + '</td>';
            $row.html(cells);
            $employeeListBody.append($row);
            $row.click();

            $('#newEmployeeName').val('');
            $('#newEmployeeSurname').val('');
        }
    });
}

function onFireEmployeeClick() {
    if (selectedBaseRow == null || !confirm(dict['confirmFireEmployee'])) {
        return;
    }
    // let $cells = $(selectedBaseRow).children();

    let employeeId = $(selectedBaseRow).children().eq(0).html();

    // let employee = {
    //     'id': $cells.eq(0).html(),
    //     'name': $cells.eq(1).html(),
    //     'surname': $cells.eq(2).html(),
    //     'position': $cells.eq(3).html()
    // };
    $.ajax({
        type: 'POST',
        url: 'employee/delete',
        data: employeeId,
        contentType: 'text/plain; charset=UTF-8',
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

function validateCrew() {
    if ('' === $('#name').val().trim()) {
        $('#errorCrewName').removeClass('hidden');
        return false;
    }
    return true;
}

function validateNewEmployee() {
    let isValid = true;
    let $newEmployeeName = $('#newEmployeeName');
    let $newEmployeeSurname = $('#newEmployeeSurname');
    if ('' === $newEmployeeName.val().trim() && '' === $newEmployeeSurname.val().trim()) {
        showErrorEmployeeMessage($('#errorEmployeeNameAndSurname'));
        isValid = false;
    } else if ('' === $newEmployeeName.val().trim()) {
        showErrorEmployeeMessage($('#errorEmployeeName'));
        isValid = false;
    } else if ('' === $newEmployeeSurname.val().trim()) {
        showErrorEmployeeMessage($('#errorEmployeeSurname'));
        isValid = false;
    }
    return isValid;
}

function showErrorEmployeeMessage($errorMessage) {
    $errorMessage.removeClass('hidden');
    setTimeout(function () {
        $errorMessage.addClass('hidden');
    }, 2000);
}