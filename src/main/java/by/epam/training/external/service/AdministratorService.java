package by.epam.training.external.service;

import by.epam.training.external.dto.FlightDto;
import by.epam.training.external.entity.Crew;
import by.epam.training.external.entity.Flight;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {
    private final String dateHtmlInputPattern = "yyyy-MM-dd";
    private final String htmlHtmlInputPattern = "HH:mm";

    private FlightService flightService;

    public AdministratorService(FlightService flightService) {
        this.flightService = flightService;
    }

    public void cancelFlight(FlightDto flightDto) {
        Flight bobtailFlight = flightService.convertToFlight(flightDto, "");
        flightService.deleteFlight(bobtailFlight);
    }

    public FlightDto getFlightDtoById(int flightId) {
        if (flightId == 0) {
            FlightDto flightDto = new FlightDto();
            flightDto.setCrew(new Crew());
            return flightDto; // flightId = 0, crewId = 0;
        }
        Flight flight = flightService.findFlight(flightId);
        return flightService.convertToDto(flight, dateHtmlInputPattern, htmlHtmlInputPattern);
    }

    public void createOrUpdateFlight(FlightDto flightDto) {
        String dateTimePattern = dateHtmlInputPattern + " " + htmlHtmlInputPattern;
        Flight bobtailFlight = flightService.convertToFlight(flightDto, dateTimePattern);
        Crew crew = bobtailFlight.getCrew();
        if (crew != null && crew.getId() == 0) {
            bobtailFlight.setCrew(null);
        }
        if (flightDto.getId() > 0) {
            flightService.updateFlight(bobtailFlight);
        } else {
            flightService.saveFlight(bobtailFlight);
        }
    }
}
