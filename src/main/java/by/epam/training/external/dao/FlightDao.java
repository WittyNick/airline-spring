package by.epam.training.external.dao;

import by.epam.training.external.entity.Flight;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FlightDao {
    private SessionFactory sessionFactory;

    public FlightDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void save(Flight flight) {
        Session session = sessionFactory.getCurrentSession();
        session.save(flight);
    }

    public Flight findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(Flight.class, id);
    }

    @SuppressWarnings(value = "unchecked")
    public List<Flight> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Flight> query = session.createQuery("FROM Flight");
        return query.list();
    }

    public void update(Flight flight) {
        Session session = sessionFactory.getCurrentSession();
        session.update(flight);
    }

    public void delete(Flight flight) {
        Session session = sessionFactory.getCurrentSession();
        session.delete(flight);
    }
}
