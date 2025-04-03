import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorFallback, GlobalLoader, LoadingFallback } from '@lemon/shared';
import { ThemeProvider } from '@lemon/theme';
import { Toaster } from '@lemon/ui-kit/components/ui/toaster';
import { useInitWebCore, useRefreshToken } from '@lemon/web-core';

import { Router } from './routes';
import i18n from '../i18n';

export function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
    });

    const isInitialized = useInitWebCore();
    useRefreshToken();

    if (!isInitialized) {
        return <LoadingFallback />;
    }

    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <HelmetProvider>
                        <QueryClientProvider client={queryClient}>
                            <ThemeProvider defaultTheme="system" storageKey="ui-theme">
                                <Router />
                                <GlobalLoader />
                                <Toaster />
                            </ThemeProvider>
                            {process.env.NODE_ENV !== 'prod' && <ReactQueryDevtools />}
                        </QueryClientProvider>
                    </HelmetProvider>
                </ErrorBoundary>
            </Suspense>
        </I18nextProvider>
    );
}

export default App;
