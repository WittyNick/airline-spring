package by.epam.training.external.controller.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("/administrator/*")
public class AdministratorFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        HttpSession session = req.getSession(false);
        String role = "";
        if (session != null) {
            role = (String) session.getAttribute("role");
        }
        if ("administrator".equals(role)) {
            chain.doFilter(req, resp);
        } else {
            resp.sendRedirect(req.getContextPath());
        }
    }
}
