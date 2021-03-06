<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>MAIN</title>
    <link rel="shortcut icon" href="<c:url value="/img/favicon.ico"/>" type="image/x-icon">

    <link rel="stylesheet" href="<c:url value="/common.css"/>">
    <link rel="stylesheet" href="<c:url value="/main.css"/>">

    <script defer src="<c:url value="/lib/jquery-3.4.1.min.js"/>"></script>
    <script defer src="<c:url value="/main.js"/>"></script>
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
            <c:if test='${"administrator".equals(role)}'>
                <td class="tab">
                    <a href="<c:url value="/administrator"/>"><spring:message code="administrator"/></a>
                </td>
            </c:if>
            <c:if test='${"dispatcher".equals(role)}'>
                <td class="tab">
                    <a href="<c:url value="/dispatcher"/>"><spring:message code="dispatcher"/></a>
                </td>
            </c:if>
            <td id="locale">
                <spring:message code="lang" var="lang"/>
                <select id="lang">
                    <option value="default">default</option>
                    <option value="en_US" <c:if test='${"en".equals(lang)}'>selected</c:if>>english</option>
                    <option value="ru_RU" <c:if test='${"ru".equals(lang)}'>selected</c:if>>русский</option>
                </select>
            </td>
            <td id="sign">
                <c:if test="${role == null}">
                    <span class="pseudoLink" onclick="location.href='<c:url value="/sign"/>'">
                        <spring:message code="sign_in"/>
                    </span>
                </c:if>
                <c:if test="${role != null}">
                    <span class="pseudoLink" onclick="signOut()">
                        <spring:message code="sign_out"/>
                    </span>
                </c:if>
            </td>
        </tr>
    </table>

    <table id="tableFlights">
        <caption><spring:message code="flights"/></caption>
        <thead>
        <tr>
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
        <tbody>
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
