<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>ADMINISTRATOR</title>
    <link rel="shortcut icon" href="<c:url value="/img/favicon.ico"/>" type="image/x-icon">

    <link rel="stylesheet" href="<c:url value="/common.css"/>">
    <link rel="stylesheet" href="<c:url value="/admin.css"/>">

    <script defer src="<c:url value="/lib/jquery-3.4.1.min.js"/>"></script>
    <script defer src="<c:url value="/admin.js"/>"></script>
</head>
<body>
<span id="confirmDelete" class="hidden"><spring:message code="flight.confirm.delete"/></span>

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
            </td>
            <td id="sign">
                <span class="pseudoLink" onclick="signOut()"><spring:message code="sign_out"/></span>
            </td>
        </tr>
    </table>

    <table id="mainTable">
        <caption id="tableCaption"><spring:message code="flights"/></caption>
        <thead>
        <tr id="hatRow">
            <th>id</th>
            <th><spring:message code="number"/></th>
            <th><spring:message code="from"/></th>
            <th><spring:message code="to"/></th>
            <th><spring:message code="departure_date"/></th>
            <th><spring:message code="departure_time"/></th>
            <th><spring:message code="arrival_date"/></th>
            <th><spring:message code="arrival_time"/></th>
            <th><spring:message code="plane"/></th>
            <th>crewId</th>
            <th><spring:message code="crew"/></th>
        </tr>
        </thead>
        <tbody id="tableBody">
        <c:forEach var="flight" items="${flights}">
            <tr>
                <td>${flight.id}</td>
                <td>${flight.flightNumber}</td>
                <td>${flight.startPoint}</td>
                <td>${flight.destinationPoint}</td>
                <td>${flight.departureDate}</td>
                <td>${flight.departureTime}</td>
                <td>${flight.arrivalDate}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.plane}</td>
                <td>${flight.crew.id}</td>
                <td>${flight.crew.name}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
    <div id="buttons">
        <form id="formEdit" method="POST" action="<c:url value="/administrator/edit"/>">
            <input id="flightId" type="hidden" name="flightId">
            <input id="buttonEdit" type="button" value="<spring:message code="flight.edit"/>" onclick="onEditClick()">
            <input id="buttonAdd" type="button" value="<spring:message code="flight.add"/>" onclick="onAddClick()">
            <input id="buttonDelete" type="button" value="<spring:message code="flight.delete"/>" onclick="onDeleteClick()">
        </form>
    </div>
</div>
</body>
</html>