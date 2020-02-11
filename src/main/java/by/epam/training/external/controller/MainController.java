package by.epam.training.external.controller;

import by.epam.training.external.dto.FlightDto;
import by.epam.training.external.service.FlightService;
import by.epam.training.external.service.LocaleService;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/")
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MainController extends AbstractController {
    private LocaleService localeService;
    private FlightService flightService;

    public MainController(LocaleService localeService, FlightService flightService) {
        this.localeService = localeService;
        this.flightService = flightService;
    }

    @GetMapping
    public String getMainPage(Model model, HttpServletRequest req) {
        Locale locale = findSessionLocale(req);
        localeService.setLocale(locale);
        List<FlightDto> flightsDto = flightService.getAllFlightsDto(locale);
        model.addAttribute("dict", localeService);
        model.addAttribute("flights", flightsDto);
        return "main";
    }
}