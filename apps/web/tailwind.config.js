const { join } = require('path');

const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

const TailwindConfig = require('../../libs/ui-kit/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...TailwindConfig,
    content: [
        join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
};
