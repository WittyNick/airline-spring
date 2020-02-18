package by.epam.training.external.service;

import by.epam.training.external.dto.FlightDto;
import by.epam.training.external.entity.Crew;
import by.epam.training.external.entity.Employee;
import by.epam.training.external.entity.Flight;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
public class DispatcherService {
    private CrewService crewService;
    private FlightService flightService;
    private EmployeeService employeeService;

    public DispatcherService(CrewService crewService, FlightService flightService, EmployeeService employeeService) {
        this.crewService = crewService;
        this.flightService = flightService;
        this.employeeService = employeeService;
    }

    @Transactional
    public void disbandCrew(FlightDto flightDto, Locale locale) {
        Flight bobtailFlight = flightService.convertToFlight(flightDto, locale);
        int crewId = bobtailFlight.getCrew().getId();
        bobtailFlight.setCrew(null);
        flightService.updateFlight(bobtailFlight);
        Crew crew = crewService.findCrew(crewId);
        crewService.deleteCrew(crew);
    }

    public Crew getCrew(int crewId) {
        if (crewId == 0) {
            return new Crew();
        }
        return crewService.findCrew(crewId);
    }

    public List<Employee> loadAllUnusedEmployees(Crew crew) {
        List<Employee> employees = employeeService.findAllEmployees();
        if (crew != null) {
            employees.removeAll(crew.getEmployees());
        }
        return employees;
    }

    @Transactional
    public void fireEmployee(int employeeId) {
        final Employee employee = employeeService.findEmployee(employeeId);
        employee.getCrews().forEach(crew -> {
            crew.getEmployees().remove(employee);
            crewService.updateCrew(crew);
        });
        employeeService.deleteEmployee(employee);
    }

    @Transactional
    public void editCrew(Flight flight) {
        Crew crew = flight.getCrew();
        if (crew.getId() == 0) {
            Flight flightWithFullData = flightService.findFlight(flight.getId());
            crewService.saveCrew(crew);
            flightWithFullData.setCrew(crew);
            flightService.updateFlight(flightWithFullData);
        }
        crewService.updateCrew(crew);
    }
}
