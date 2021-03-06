package by.epam.training.external.controller;

import by.epam.training.external.dto.FlightDto;
import by.epam.training.external.service.AdministratorService;
import by.epam.training.external.service.FlightService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/administrator")
public class AdminController {
    private AdministratorService administratorService;
    private FlightService flightService;
    private LocaleResolver localeResolver;

    public AdminController(
            AdministratorService administratorService,
            FlightService flightService,
            LocaleResolver localeResolver) {
        this.administratorService = administratorService;
        this.flightService = flightService;
        this.localeResolver = localeResolver;
    }

    @GetMapping
    public String getAdminPage(Model model, HttpServletRequest req) {
        Locale locale = localeResolver.resolveLocale(req);
        List<FlightDto> flightsDto = flightService.getAllFlightsDto(locale);
        model.addAttribute("flights", flightsDto);
        return "admin";
    }

    @PostMapping("/delete")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteFlight(@RequestBody FlightDto bobtailFlightDto) {
        administratorService.cancelFlight(bobtailFlightDto);
    }

    @PostMapping("/edit")
    public String goToFlightEditPage(@RequestParam Integer flightId, Model model) {
        FlightDto flightDto = administratorService.getFlightDtoById(flightId);
        model.addAttribute("flight", flightDto);
        return "flight_edit";
    }

    @PostMapping("/save")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveFlight(@RequestBody FlightDto bobtailFlightDto) {
        administratorService.createOrUpdateFlight(bobtailFlightDto);
    }
}
