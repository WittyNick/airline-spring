package by.epam.training.external.service;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

/**
 * Singleton.
 * The class allows read *.property files.
 */
@Component
@Scope("session")
public class LocaleService {
    private final UTF8Control utf8Control = new UTF8Control();
    private final String localePropertyFile = "locale.locale";
    private ResourceBundle localeBundle;

    public LocaleService() {
        Locale defaultLocale = new Locale("en", "US");
        localeBundle = ResourceBundle.getBundle(localePropertyFile, defaultLocale, utf8Control);
    }

    /**
     * Reads localized word from resource file and returns in as String.
     *
     * @param key key-word that needs to be localized
     * @return localized word
     */
    public String getString(String key) {
        return localeBundle.getString(key);
    }

    public final void setLocale(Locale locale) {
         localeBundle = ResourceBundle.getBundle(localePropertyFile, locale, utf8Control);
    }

    /**
     * Solve problem with ResourceBundle property files encoding.
     * Set encoding UTF-8 instead of default in Windows ISO-8859-1.
     */
    private static class UTF8Control extends ResourceBundle.Control {
        @Override
        public ResourceBundle newBundle(String baseName, Locale locale, String format, ClassLoader loader, boolean reload) throws IOException {
            // The below is copy of the default implementation.
            String bundleName = toBundleName(baseName, locale);
            String resourceName = toResourceName(bundleName, "properties");
            ResourceBundle bundle = null;
            InputStream stream = null;
            if (reload) {
                URL url = loader.getResource(resourceName);
                if (url != null) {
                    URLConnection connection = url.openConnection();
                    if (connection != null) {
                        connection.setUseCaches(false);
                        stream = connection.getInputStream();
                    }
                }
            } else {
                stream = loader.getResourceAsStream(resourceName);
            }
            if (stream != null) {
                try {
                    // Only this line is changed to make it to read properties files as UTF-8.
                    bundle = new PropertyResourceBundle(new InputStreamReader(stream, StandardCharsets.UTF_8));
                } finally {
                    stream.close();
                }
            }
            return bundle;
        }
    }
}
