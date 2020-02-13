package by.epam.training.external.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/signin")
public class SignController {

    @GetMapping
    public String getSignInPage() {
        return "sign_in";
    }

    @PostMapping
    @ResponseBody
    protected String checkUserRole(@RequestParam String login, @RequestParam String password, HttpServletRequest req) {
        if ("admin".equals(login) && "admin".equals(password)) {
            saveUserRoleToSession(req,"administrator");
            return "administrator";
        }
        if ("dispatcher".equals(login) && "dispatcher".equals(password)) {
            saveUserRoleToSession(req, "dispatcher");
            return "dispatcher";
        }
        return "";
    }

    private void saveUserRoleToSession(HttpServletRequest req, String role) {
        HttpSession session = req.getSession();
        session.setAttribute("role", role);
    }
}
