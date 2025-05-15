import { Navigate } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { useRouteHandle } from '../../../../hooks';

import type { RouteHandle } from '../../../../hooks';
import type { PropsWithChildren } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const [, routes] = useRouteHandle();
    const isAuthenticated = useWebCoreStore(state => state.isAuthenticated);

    const routeType: RouteHandle['type'] =
        [...routes].reverse().find(route => route.handle?.type !== undefined)?.handle?.type || 'public';

    if (routeType === 'protected' && !isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (routeType === 'guest-only' && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};
