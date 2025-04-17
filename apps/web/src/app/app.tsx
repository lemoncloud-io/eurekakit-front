import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { OverlayProvider } from '@lemon/overlay';
import { ErrorFallback, GlobalLoader, LoadingFallback } from '@lemon/shared';
import { ThemeProvider } from '@lemon/theme';
import { Toaster } from '@lemon/ui-kit/components/ui/toaster';
import { useInitWebCore, useRefreshToken } from '@lemon/web-core';

import { Router } from './routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            throwOnError: true,
        },
    },
});

export function App() {
    const isInitialized = useInitWebCore();
    useRefreshToken();

    if (!isInitialized) {
        return <LoadingFallback />;
    }

    return (
        <Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider defaultTheme="light">
                            <OverlayProvider>
                                <Router />
                                <GlobalLoader />
                                <Toaster />
                            </OverlayProvider>
                        </ThemeProvider>
                        {process.env.NODE_ENV !== 'prod' && <ReactQueryDevtools client={queryClient} />}
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </Suspense>
    );
}

export default App;
