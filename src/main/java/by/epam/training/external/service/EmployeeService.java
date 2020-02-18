package by.epam.training.external.service;

import by.epam.training.external.dao.EmployeeDao;
import by.epam.training.external.entity.Employee;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private EmployeeDao employeeDao;

    public EmployeeService(EmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }

    public void saveEmployee(Employee employee) {
        employeeDao.save(employee);
    }

    public Employee findEmployee(int id) {
        return employeeDao.findById(id);
    }

    public List<Employee> findAllEmployees() {
        return employeeDao.findAll();
    }

    public void deleteEmployee(Employee employee) {
        employeeDao.delete(employee);
    }
}
