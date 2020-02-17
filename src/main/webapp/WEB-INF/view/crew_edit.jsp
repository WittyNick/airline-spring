<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>CREW EDIT</title>
    <link rel="shortcut icon" href="<c:url value="/img/favicon.ico"/>" type="image/x-icon">

    <link rel="stylesheet" href="<c:url value="/common.css"/>">
    <link rel="stylesheet" href="<c:url value="/crew_edit.css"/>">

    <script defer src="<c:url value="/lib/jquery-3.4.1.min.js"/>"></script>
    <script defer src="<c:url value="/crew_edit.js"/>"></script>
    <script>
        let dict = {
            "confirmFireEmployee": '<spring:message code="crew.edit.confirm.fire_employee"/>',
            "PILOT": '<spring:message code="pilot"/>',
            "NAVIGATOR": '<spring:message code="navigator"/>',
            "COMMUNICATOR": '<spring:message code="communicator"/>',
            "STEWARDESS": '<spring:message code="stewardess"/>'
        }
    </script>
</head>
<body>
<div id="content" lang="<spring:message code="lang"/>">
    <div id="empty"></div>
    <table id="header">
        <tr>
            <td id="space"></td>
            <td id="mainTab" class="tab"><a href="<c:url value="/"/>"><spring:message code="main"/></a></td>
            <td id="dispatcherTab" class="picketTab"><spring:message code="dispatcher"/></td>
            <td id="locale">
                <spring:message code="lang" var="lang"/>
                <select id="lang">
                    <option value="default">default</option>
                    <option value="en_US" <c:if test='${"en".equals(lang)}'>selected</c:if>>english</option>
                    <option value="ru_RU" <c:if test='${"ru".equals(lang)}'>selected</c:if>>русский</option>
                </select>
            </td>
            <td id="sign">
                <span class="pseudoLink" onclick="signOut()"><spring:message code="sign_out"/></span>
            </td>
        </tr>
    </table>

    <input id="flightId" type="hidden" value="${flightId}">
    <input id="crewId" type="hidden" value="${crew.id}">

    <div id="editElements">
        <label id="labelName" for="name"><spring:message code="crew.edit.name"/></label><br>
        <input id="name" type="text" value="${crew.name}">
        <span id="errorCrewName" class="message hidden">
            <spring:message code="message.crew.edit.enter_crew_name"/>
        </span>
        <table id="employeeList">
            <caption id="captionEmployeeList"><spring:message code="crew.edit.employee_list"/></caption>
            <thead>
            <tr id="hatEmployeeListRow">
                <th>id</th>
                <th><spring:message code="name"/></th>
                <th><spring:message code="surname"/></th>
                <th>positionEnum</th>
                <th><spring:message code="position"/></th>
            </tr>
            </thead>
            <tbody id="employeeListBody">
            <c:forEach var="employee" items="${crew.employees}">
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.surname}</td>
                    <td>${employee.position.name()}</td>
                    <td><spring:message code="${employee.position.name().toLowerCase()}"/></td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <input id="buttonRemoveFromCrew" type="button" value="<spring:message code="crew.edit.remove_from_crew"/>"
               onclick="onRemoveFromCrewClick()">
        <table id="tableNewEmployee">
            <tr>
                <td>
                    <label id="labelNewEmployeeName" for="newEmployeeName">
                        <spring:message code="crew.edit.name"/>
                    </label><br>
                    <input id="newEmployeeName" type="text">
                </td>
                <td>
                    <label id="labelNewEmployeeSurname" for="newEmployeeSurname">
                        <spring:message code="crew.edit.surname"/>
                    </label><br>
                    <input id="newEmployeeSurname" type="text">
                </td>
                <td>
                    <label id="labelNewEmployeePosition" for="newEmployeePosition">
                        <spring:message code="crew.edit.position"/>
                    </label><br>
                    <select id="newEmployeePosition">
                        <option value="PILOT"><spring:message code="pilot"/></option>
                        <option value="NAVIGATOR"><spring:message code="navigator"/></option>
                        <option value="COMMUNICATOR"><spring:message code="communicator"/></option>
                        <option value="STEWARDESS"><spring:message code="stewardess"/></option>
                    </select>
                </td>
                <td>
                    <br>
                    <input id="buttonEngageEmployee" type="button"
                           value="<spring:message code="crew.edit.engage_employee"/>" onclick="onEngageEmployeeClick()">
                </td>
            </tr>
        </table>
        <div id="errorEmployeeName" class="message hidden">
            <spring:message code="message.crew.edit.enter_employee_name"/>
        </div>
        <div id="errorEmployeeSurname" class="message hidden">
            <spring:message code="message.crew.edit.enter_employee_surname"/>
        </div>
        <div id="errorEmployeeNameAndSurname" class="message hidden">
            <spring:message code="message.crew.edit.enter_employee_name_and_surname"/>
        </div>

        <table id="employeeBase">
            <caption id="captionEmployeeBase"><spring:message code="crew.edit.employee_base"/></caption>
            <thead>
            <tr id="hatEmployeeBaseRow">
                <th>id</th>
                <th><spring:message code="name"/></th>
                <th><spring:message code="surname"/></th>
                <th>positionEnum</th>
                <th><spring:message code="position"/></th>
            </tr>
            </thead>
            <tbody id="employeeBaseBody">
            <c:forEach var="employee" items="${employees}">
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.surname}</td>
                    <td>${employee.position.name()}</td>
                    <td><spring:message code="${employee.position.name().toLowerCase()}"/></td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <input id="buttonAddToCrew" type="button" value="<spring:message code="crew.edit.add_to_crew"/>"
               onclick="onAddToCrewClick()">
        <input id="buttonFireEmployee" type="button" value="<spring:message code="crew.edit.fire_employee"/>"
               onclick="onFireEmployeeClick()"><br>
    </div>
    <div id="buttons">
        <input id="buttonSave" type="button" value="<spring:message code="crew.edit.save"/>" onclick="saveAction()">
        <input id="buttonCancel" type="button" value="<spring:message code="crew.edit.cancel"/>"
               onclick="location.href='<c:url value="/dispatcher"/>'">
    </div>
</div>
</body>
</html>