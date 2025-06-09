import type { UserConfig } from 'i18next-parser';

const config: UserConfig = {
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    output: 'apps/landing/public/locales/$LOCALE/translation.json',
    locales: ['en', 'ko'],
    defaultNamespace: 'translation',
    keepRemoved: false,
    sort: true,
    defaultValue: (locale: string, namespace: string, key: string) => (locale === 'en' ? key : ''),
    keySeparator: false,
};

export default config;
