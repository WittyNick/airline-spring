package by.epam.training.external.dao;

import by.epam.training.external.entity.Crew;
import by.epam.training.external.service.util.HibernateSessionFactoryUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CrewDao {
    private SessionFactory sessionFactory = HibernateSessionFactoryUtil.getSessionFactory();

    public void save(Crew crew) {
        Session session = sessionFactory.getCurrentSession();
        session.save(crew);
    }

    public Crew findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(Crew.class, id);
    }

    @SuppressWarnings(value = "unchecked")
    public List<Crew> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Crew> query = session.createQuery("FROM Crew");
        return query.list();
    }

    public void update(Crew crew) {
        Session session = sessionFactory.getCurrentSession();
        session.update(crew);
    }

    public void delete(Crew crew) {
        Session session = sessionFactory.getCurrentSession();
        session.delete(crew);
    }
}
