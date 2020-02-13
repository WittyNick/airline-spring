package by.epam.training.external.controller;

import by.epam.training.external.service.L10nService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;
import java.util.Map;

@Controller
@RequestMapping("/locale")
public class L10nController {
    private L10nService l10nService;
    private LocaleResolver localeResolver;

    public L10nController(L10nService l10nService, LocaleResolver localeResolver) {
        this.l10nService = l10nService;
        this.localeResolver = localeResolver;
    }

    @PostMapping
    @ResponseBody
    public Map<String, String> getDict(@RequestBody String[] words, HttpServletRequest req) {
        Locale locale = localeResolver.resolveLocale(req);
        return l10nService.getDict(words, locale);
    }
}
