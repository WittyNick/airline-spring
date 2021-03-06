package by.epam.training.external.dao;

import by.epam.training.external.entity.Flight;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class FlightDao {
    private SessionFactory sessionFactory;

    public FlightDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public void save(Flight flight) {
        Session session = sessionFactory.getCurrentSession();
        session.save(flight);
    }

    @Transactional
    public Flight findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(Flight.class, id);
    }

    @Transactional
    public List<Flight> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Flight> query = session.createQuery("FROM Flight", Flight.class);
        return query.list();
    }

    @Transactional
    public void update(Flight flight) {
        Session session = sessionFactory.getCurrentSession();
        session.update(flight);
    }

    @Transactional
    public void delete(Flight flight) {
        Session session = sessionFactory.getCurrentSession();
        session.delete(flight);
    }
}
