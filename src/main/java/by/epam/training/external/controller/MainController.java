package by.epam.training.external.controller;

import by.epam.training.external.dto.FlightDto;
import by.epam.training.external.service.FlightService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/")
public class MainController {
    private FlightService flightService;
    private LocaleResolver localeResolver;

    public MainController(FlightService flightService, LocaleResolver localeResolver) {
        this.flightService = flightService;
        this.localeResolver = localeResolver;
    }

    @GetMapping
    public String getMainPage(Model model, HttpServletRequest req) {
        Locale locale = localeResolver.resolveLocale(req);
        String userRole = getUserRole(req);
        List<FlightDto> flightsDto = flightService.getAllFlightsDto(locale);
        model.addAttribute("flights", flightsDto);
        model.addAttribute("role", userRole);
        return "main";
    }

    private String getUserRole(HttpServletRequest req) {
        HttpSession session = req.getSession();
        return (String) session.getAttribute("role");
    }
}