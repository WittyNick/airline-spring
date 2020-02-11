package by.epam.training.external.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Locale;

public abstract class AbstractController {

    Locale findSessionLocale(HttpServletRequest req) {
        HttpSession session = req.getSession();
        Locale locale = (Locale) session.getAttribute("locale");
        if (locale != null) {
            return locale;
        }
        return req.getLocale();
    }
}
