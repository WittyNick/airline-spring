package by.epam.training.external.dao;

import by.epam.training.external.entity.Employee;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class EmployeeDao {
    private SessionFactory sessionFactory;

    public EmployeeDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public void save(Employee employee) {
        Session session = sessionFactory.getCurrentSession();
        session.save(employee);
    }

    @Transactional
    public Employee findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(Employee.class, id);
    }

    @Transactional
    @SuppressWarnings(value = "unchecked")
    public List<Employee> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Employee> query = session.createQuery("FROM Employee");
        return query.list();
    }

    @Transactional
    public void delete(Employee employee) {
        Session session = sessionFactory.getCurrentSession();
        session.delete(employee);
    }
}