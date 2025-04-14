import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import i18n from 'i18next';

import en from '../../locales/en.json';
import ko from '../../locales/ko.json';

i18n.use(initReactI18next).init({
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ko'],
    compatibilityJSON: 'v3',
    resources: {
        en: {
            translation: en,
        },
        ko: {
            translation: ko,
        },
    },
});

export default i18n;
