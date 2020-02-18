package by.epam.training.external.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({HibernateConfig.class})
public class RootApplicationContextConfig {

}
