package by.epam.training.external.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user/validate")
public class UserValidateController {

    @PostMapping
    @ResponseBody
    public String getUserRole(HttpServletRequest req) {
        HttpSession session = req.getSession();
        String role = (String) session.getAttribute("role");
        return role != null ? role : "guest";
    }
}
