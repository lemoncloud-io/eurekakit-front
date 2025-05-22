/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import svgr from 'vite-plugin-svgr';

const removeVitePrefix = (envVar: string) => envVar.replace('VITE_', '');

const htmlEnvInjectionPlugin = () => {
    return {
        name: 'html-env-injection',
        transformIndexHtml: {
            transform(html: string) {
                const envVars = Object.entries(process.env)
                    .filter(([key]) => key.startsWith('VITE_'))
                    .reduce(
                        (acc, [key, value]) => {
                            acc[removeVitePrefix(key)] = value || '';
                            return acc;
                        },
                        {} as Record<string, string>
                    );

                const envScript = `
                <script>
                    (function() {
                        ${Object.entries(envVars)
                            .map(([key, value]) => `window.${key}="${value}";`)
                            .join('\n')}
                    })();
                </script>
            `;

                return html.replace(/<body>/, `${envScript}\n<body>`);
            },
        },
    };
};

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/web',

    define: {
        'process.env': {},
        ...(process.env.NODE_ENV === 'development' ? { global: 'window' } : {}),
    },

    resolve: {
        alias: {
            '@lemon/assets': '/assets/src/index.ts',
            ...(process.env.NODE_ENV !== 'development'
                ? {
                      './runtimeConfig': './runtimeConfig.browser', // fix production build
                  }
                : {}),
        },
    },

    server: {
        port: 4200,
        host: 'localhost',
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), searchForWorkspaceRoot(process.cwd()) + '../../../assets'],
        },
    },

    preview: {
        port: 4300,
        host: 'localhost',
    },

    plugins: [
        htmlEnvInjectionPlugin(),
        svgr(),
        react(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        visualizer({
            filename: 'dist/stats.html',
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
        }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        sourcemap: process.env.VITE_ENV !== 'PROD',
        minify: 'terser',
        outDir: '../../dist/apps/web',
        reportCompressedSize: true,
        commonjsOptions: {
            include: [/node_modules/],
            extensions: ['.js', '.cjs'],
            strictRequires: true,
            // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
            transformMixedEsModules: true,
        },
    },

    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },

    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/apps/web',
            provider: 'v8',
        },
    },
});
