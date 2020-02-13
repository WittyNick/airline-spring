<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>LOGIN</title>
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="common.css">
    <link rel="stylesheet" href="sign_in.css">

    <script defer src="lib/jquery-3.4.1.min.js"></script>
    <script defer src="sign_in.js"></script>
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
            <input id="login" name="login" type="text" tabindex="1" autofocus>
            <span id="messageLogin" class="message"></span><br>

            <label for="password"><spring:message code="password"/></label><br>
            <input id="password" name="password" type="password" tabindex="2" autofocus>
            <span id="messagePassword" class="message"></span><br>
            <div id="messageFail" class="message"></div>

            <input id="buttonSubmit" type="button" value="<spring:message code="enter"/>" tabindex="3" autofocus>
            <input id="buttonCancel" type="button" value="<spring:message code="cancel"/>" onclick="location.href='${ctx}'">
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
