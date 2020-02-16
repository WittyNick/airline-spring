package by.epam.training.external.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/sign")
public class SignController {

    @GetMapping
    public String getSignInPage() {
        return "sign_in";
    }

    @PostMapping("/check")
    @ResponseBody
    public String checkUserRole(@RequestParam String login, @RequestParam String password, HttpSession session) {
        if ("admin".equals(login) && "admin".equals(password)) {
            session.setAttribute("role", "administrator");
            return "administrator";
        }
        if ("dispatcher".equals(login) && "dispatcher".equals(password)) {
            session.setAttribute("role", "dispatcher");
            return "dispatcher";
        }
        return "";
    }

    @PostMapping("/out")
    @ResponseStatus(value = HttpStatus.OK)
    public void signOut(HttpSession session) {
        session.invalidate();
    }
}
