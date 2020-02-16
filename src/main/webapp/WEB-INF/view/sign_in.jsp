<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>LOGIN</title>
    <link rel="shortcut icon" href="<c:url value="/img/favicon.ico"/>" type="image/x-icon">

    <link rel="stylesheet" href="<c:url value="/common.css"/>">
    <link rel="stylesheet" href="<c:url value="/sign_in.css"/>">

    <script defer src="<c:url value="/lib/jquery-3.4.1.min.js"/>"></script>
    <script defer src="<c:url value="/sign_in.js"/>"></script>
</head>
<body>
<div id="content" lang="<spring:message code="lang"/>">
    <div id="empty"></div>
    <table id="header">
        <tr>
            <td id="locale">
                <spring:message code="lang" var="lang"/>
                <select id="lang">
                    <option value="default">default</option>
                    <option value="en_US" <c:if test='${"en".equals(lang)}'>selected</c:if>>english</option>
                    <option value="ru_RU" <c:if test='${"ru".equals(lang)}'>selected</c:if>>русский</option>
                </select>
            </td>
            <td id="sign"></td>
        </tr>
    </table>

    <fieldset id="fieldsetLogIn">
        <legend><spring:message code="legend_sign_in"/></legend>
        <form>
            <label for="login"><spring:message code="login"/></label><br>
            <input id="login" name="login" type="text" autofocus>
            <span id="messageLogin" class="message hidden"><spring:message code="message.sign_in.login"/></span><br>

            <label for="password"><spring:message code="password"/></label><br>
            <input id="password" name="password" type="password" autofocus>
            <span id="messagePassword" class="message hidden"><spring:message code="message.sign_in.password"/></span><br>
            <div id="messageFail" class="message hidden"><spring:message code="message.sign_in.fail"/></div>

            <input id="buttonSubmit" type="button" value="<spring:message code="enter"/>" autofocus>
            <input id="buttonCancel" type="button" value="<spring:message code="cancel"/>"
                   onclick="location.href='<c:url value="/"/>'"/>
        </form>
    </fieldset>
    <br>
    <div class="container">
        <i>
            <b>* default accounts:</b> <br>
            <b>login:</b> admin | <b>password:</b> admin<br>
            <b>login:</b> dispatcher | <b>password:</b> dispatcher
        </i>
    </div>
</div>
</body>
</html>