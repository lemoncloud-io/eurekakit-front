import { ErrorBoundary } from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import type { FallbackProps } from 'react-error-boundary';

export const withQueryErrorBoundary = <T extends object>(
    Component: React.ComponentType<T>,
    errorFallback: (fallbackProps: FallbackProps) => React.ReactNode
) => {
    return (props: T) => (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary onReset={reset} FallbackComponent={errorFallback}>
                    <Component {...props} />
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};
