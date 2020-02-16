<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>FLIGHT EDIT</title>
    <link rel="shortcut icon" href="<c:url value="/img/favicon.ico"/>" type="image/x-icon">

    <link rel="stylesheet" href="<c:url value="/common.css"/>">
    <link rel="stylesheet" href="<c:url value="/flight_edit.css"/>">

    <script defer src="<c:url value="/lib/jquery-3.4.1.min.js"/>"></script>
    <script defer src="<c:url value="/flight_edit.js"/>"></script>
</head>
<body>
<spring:message code="message.flight.edit.fill_field" var="errorEmpty"/>
<spring:message code="message.flight.edit.illegal_value" var="errorIllegal"/>
<spring:message code="message.flight.edit.fill_date_time" var="errorEmptyDateTime"/>
<div id="content" lang="<spring:message code="lang"/>">
    <div id="empty"></div>
    <table id="header">
        <tr>
            <td id="space"></td>
            <td id="mainTab" class="tab"><a href="<c:url value="/"/>"><spring:message code="main"/></a></td>
            <td id="administratorTab" class="picketTab"><spring:message code="administrator"/></td>
            <td id="locale">
                <spring:message code="lang" var="lang"/>
                <select id="lang">
                    <option value="default">default</option>
                    <option value="en_US" <c:if test='${"en".equals(lang)}'>selected</c:if>>english</option>
                    <option value="ru_RU" <c:if test='${"ru".equals(lang)}'>selected</c:if>>русский</option>
                </select>
            <td id="sign">
                <span class="pseudoLink" onclick="signOut()"><spring:message code="sign_out"/></span>
            </td>
        </tr>
    </table>
    <form id="formMain">
        <input id="id" type="hidden" value="${flight.id}">
        <input id="crewId" type="hidden" value="${flight.crew.id}">
        <label id="labelFlightNumber" for="flightNumber"><spring:message code="flight.edit.number"/></label><br>
        <input id="flightNumber" type="text"
               value="<c:if test="${flight.flightNumber > 0}">${flight.flightNumber}</c:if>">
        <span id="messageFlightNumberEmpty" class="message hidden">${errorEmpty}</span>
        <span id="messageFlightNumberIllegal" class="message hidden">${errorIllegal}</span><br>

        <label id="labelStartPoint" for="startPoint"><spring:message code="flight.edit.from"/></label><br>
        <input id="startPoint" type="text" maxlength="30ch" value="${flight.startPoint}">
        <span id="messageStartPoint" class="message hidden">${errorEmpty}</span><br>

        <label id="labelDestinationPoint" for="destinationPoint"><spring:message code="flight.edit.to"/></label><br>
        <input id="destinationPoint" type="text" maxlength="30ch" value="${flight.destinationPoint}">
        <span id="messageDestinationPoint" class="message hidden">${errorEmpty}</span>

        <table>
            <tr>
                <td>
                    <label id="labelDepartureDate" for="departureDate">
                        <spring:message code="flight.edit.departure_date"/>
                    </label><br>
                    <input id="departureDate" type="date" value="${flight.departureDate}">
                </td>
                <td>
                    <label id="labelDepartureTime" for="departureTime">
                        <spring:message code="flight.edit.departure_time"/>
                    </label><br>
                    <input id="departureTime" type="time" value="${flight.departureTime}">
                </td>
                <td>
                    <br><span id="messageDepartureDateTime" class="message hidden">${errorEmptyDateTime}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <label id="labelArrivalDate" for="arrivalDate">
                        <spring:message code="flight.edit.arrival_date"/>
                    </label><br>
                    <input id="arrivalDate" type="date" value="${flight.arrivalDate}">
                </td>
                <td>
                    <label id="labelArrivalTime" for="arrivalTime">
                        <spring:message code="flight.edit.arrival_time"/>
                    </label><br>
                    <input id="arrivalTime" type="time" value="${flight.arrivalTime}">
                </td>
                <td>
                    <br><span id="messageArrivalDateTime" class="message hidden">${errorEmptyDateTime}</span>
                </td>
            </tr>
        </table>
        <label id="labelPlane" for="plane"><spring:message code="flight.edit.plane"/></label><br>
        <input id="plane" type="text" maxlength="20ch" value="${flight.plane}">
        <span id="messagePlane" class="message hidden">${errorEmpty}</span><br>
        <input id="buttonSave" type="button" value="<spring:message code="flight.edit.save"/>"
               onclick="onSaveClick()">
        <input id="buttonCancel" type="button" value="<spring:message code="flight.edit.cancel"/>"
               onclick="location.href='<c:url value="/administrator"/>'">
    </form>
</div>
</body>
</html>