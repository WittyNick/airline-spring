package by.epam.training.external.controller;

import by.epam.training.external.dto.FlightDto;
import by.epam.training.external.entity.Crew;
import by.epam.training.external.entity.Employee;
import by.epam.training.external.entity.Flight;
import by.epam.training.external.service.DispatcherService;
import by.epam.training.external.service.EmployeeService;
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
@RequestMapping("/dispatcher")
public class DispatchController {
    private DispatcherService dispatcherService;
    private EmployeeService employeeService;
    private FlightService flightService;
    private LocaleResolver localeResolver;

    public DispatchController(
            DispatcherService dispatcherService,
            EmployeeService employeeService,
            FlightService flightService,
            LocaleResolver localeResolver) {
        this.dispatcherService = dispatcherService;
        this.employeeService = employeeService;
        this.flightService = flightService;
        this.localeResolver = localeResolver;
    }

    @GetMapping
    public String getDispatcherPage(Model model, HttpServletRequest req) {
        Locale locale = localeResolver.resolveLocale(req);
        List<FlightDto> flightsDto = flightService.getAllFlightsDto(locale);
        model.addAttribute("flights", flightsDto);
        return "dispatch";
    }

    @PostMapping("/delete")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteCrew(@RequestBody FlightDto bobtailFlightDto, HttpServletRequest req) {
        Locale locale = localeResolver.resolveLocale(req);
        dispatcherService.disbandCrew(bobtailFlightDto, locale);
    }

    @PostMapping("/edit")
    public String goToEditFlightPage(@RequestParam Integer flightId, @RequestParam Integer crewId, Model model) {
        Crew crew = dispatcherService.getCrew(crewId);
        List<Employee> unusedEmployees = dispatcherService.loadAllUnusedEmployees(crew);
        model.addAttribute("flightId", flightId);
        model.addAttribute("crew", crew);
        model.addAttribute("employees", unusedEmployees);
        return "crew_edit";
    }

    @PostMapping("/employee/add")
    @ResponseBody
    public Employee saveNewEmployee(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return employee;
    }

    @PostMapping("/employee/delete")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteEmployee(@RequestBody String employeeId) {
        dispatcherService.fireEmployee(Integer.parseInt(employeeId));
    }

    @PostMapping("/save")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveCrew(@RequestBody Flight bobtailFlight) {
        dispatcherService.editCrew(bobtailFlight);
    }
}
