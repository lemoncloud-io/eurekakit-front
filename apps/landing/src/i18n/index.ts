import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';

const i18nInitOptions = {
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['ko', 'en'],
    interpolation: {
        escapeValue: false,
    },
    ns: ['translation'],
    defaultNS: 'translation',
    debug: process.env.NODE_ENV === 'development',
};

i18n.use(Backend).use(initReactI18next).init(i18nInitOptions);

export default i18n;
