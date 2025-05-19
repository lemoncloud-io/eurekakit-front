import { Suspense } from 'react';

import type { ReactNode } from 'react';

export const withSuspense = <T extends object>(
    Component: React.ComponentType<T>,
    fallback: ReactNode,
    name?: string
) => {
    return (props: T) => (
        <Suspense fallback={fallback} name={name}>
            <Component {...props} />
        </Suspense>
    );
};
