import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    lng: 'en', 
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: require('./translate/en/translation.json'), // Путь к файлу en.json
      },
      ru: {
        translation: require('./translate/ru/translation.json'), // Путь к файлу ru.json
      },
      az: {
        translation: require('./translate/az/translation.json'), // Путь к файлу az.json
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
