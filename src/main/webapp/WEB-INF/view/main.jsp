<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>MAIN</title>
    <link rel="shortcut icon" href="${ctx}/static/img/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="${ctx}/static/css/common.css">
    <link rel="stylesheet" href="${ctx}/static/css/main.css">

    <script defer src="${ctx}/static/js/lib/jquery-3.4.1.min.js"></script>
    <script defer src="${ctx}/static/js/main.js"></script>
</head>
<body>
<div id="content" lang="<spring:message code="lang"/>">
    <div id="empty"></div>
    <table id="header">
        <tr>
            <td id="space"></td>
            <td id="mainTab" class="picketTab">
                <spring:message code="main"/>
            </td>
            <td id="administratorTab" class="tab hidden">
                <a href="${ctx}/administrator"><spring:message code="administrator"/></a>
            </td>
            <td id="dispatcherTab" class="tab hidden">
                <a href="${ctx}/dispatcher"><spring:message code="dispatcher"/></a>
            </td>
            <td id="locale">
                <spring:message code="lang" var="lang"/>
                <select id="lang">
                    <option value="default">default</option>
                    <option value="en_US" <c:if test='${"en".equals(lang)}'>selected</c:if>>english</option>
                    <option value="ru_RU" <c:if test='${"ru".equals(lang)}'>selected</c:if>>русский</option>
                </select>
            </td>
            <td id="sign">
                <span class="pseudolink hidden" onclick="location.href='${ctx}/signin'">
                    <spring:message code="sign_in"/>
                </span>
                <span class="pseudolink hidden" onclick="signOut()">
                    <spring:message code="sign_out"/>
                </span>
            </td>
        </tr>
    </table>

    <table id="tableFlights">
        <caption id="tableCaption">Flights</caption>
        <thead>
        <tr id="hatRow">
            <th><spring:message code="number"/></th>
            <th><spring:message code="from"/></th>
            <th><spring:message code="to"/></th>
            <th><spring:message code="departure_date"/></th>
            <th><spring:message code="departure_time"/></th>
            <th><spring:message code="arrival_date"/></th>
            <th><spring:message code="arrival_time"/></th>
            <th><spring:message code="plane"/></th>
        </tr>
        </thead>
        <tbody id="tableBody">
        <c:forEach var="flight" items="${flights}">
            <tr>
                <td>${flight.flightNumber}</td>
                <td>${flight.startPoint}</td>
                <td>${flight.destinationPoint}</td>
                <td>${flight.departureDate}</td>
                <td>${flight.departureTime}</td>
                <td>${flight.arrivalDate}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.plane}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
</body>
</html>
