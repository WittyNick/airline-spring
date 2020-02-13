package by.epam.training.external.service;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
public class L10nService {
    private MessageSource messageSource;

    public L10nService(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public Map<String, String> getDict(final String[] words, final Locale locale) {
        final Map<String, String> dict = new HashMap<>();
        Arrays.stream(words).forEach(word -> {
            String message = messageSource.getMessage(word, null, "", locale);
            dict.put(word, message);
        });
        return dict;
    }
}
