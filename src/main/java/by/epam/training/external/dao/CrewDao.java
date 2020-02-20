package by.epam.training.external.dao;

import by.epam.training.external.entity.Crew;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CrewDao {
    private SessionFactory sessionFactory;

    public CrewDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public void save(Crew crew) {
        Session session = sessionFactory.getCurrentSession();
        session.save(crew);
    }

    @Transactional
    public Crew findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(Crew.class, id);
    }

    @Transactional
    public void update(Crew crew) {
        Session session = sessionFactory.getCurrentSession();
        session.update(crew);
    }

    @Transactional
    public void delete(Crew crew) {
        Session session = sessionFactory.getCurrentSession();
        session.delete(crew);
    }
}
