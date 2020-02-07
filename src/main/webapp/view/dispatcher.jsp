<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>DISPATCHER</title>

    <link rel="shortcut icon" href="${ctx}/img/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="${ctx}/css/common.css">
    <link rel="stylesheet" href="${ctx}/css/dispatcher.css">

    <script defer src="${ctx}/js/lib/jquery-3.4.1.min.js"></script>
    <script defer src="${ctx}/js/locale.js"></script>
    <script defer src="${ctx}/js/dispatcher.js"></script>
</head>
<body>
<div id="content">
    <div id="empty"></div>
    <table id="header">
        <tr>
            <td id="space"></td>
            <td id="mainTab" class="tab"><a href="${ctx}">main</a></td>
            <td id="dispatcherTab" class="picketTab">dispatcher</td>
            <td id="locale">
                <select id="lang">
                    <option value="default">default</option>
                    <option value="en_US">english</option>
                    <option value="ru_RU">русский</option>
                </select>
            </td>
            <td id="sign">
                <span class="pseudolink" onclick="signOut()">sign out</span>
            </td>
        </tr>
    </table>

    <table id="mainTable">
        <caption id="tableCaption">Flights</caption>
        <thead>
        <tr id="hatRow">
            <th>id</th>
            <th>Number</th>
            <th>From</th>
            <th>To</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Plane</th>
            <th>crewId</th>
            <th>Crew</th>
        </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
    </table>
    <div id="buttons">
        <form id="formEdit" method="POST" action="${ctx}/dispatcher/edit">
            <input id="flightId" type="hidden" name="flightId">
            <input id="crewId" type="hidden" name="crewId">
            <input id="buttonEdit" type="button" value="Edit Crew" onclick="buttonEditAction()">
            <input id="buttonDelete" type="button" value="Delete Crew" onclick="buttonDeleteCrewAction()">
        </form>
    </div>
</div>
</body>
</html>
