import { Navigate } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { useRouteHandle } from '../../../../hooks';

import type { PropsWithChildren } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const [, routes] = useRouteHandle();
    const isAuthenticated = useWebCoreStore(state => state.isAuthenticated);

    const requireAuth = routes
        .map(route => route.handle?.requireAuth ?? false)
        .some(requireAuth => requireAuth === true);

    const skipAuth = routes.map(route => route.handle?.skipAuth ?? false).some(skipAuth => skipAuth === true);

    if (!skipAuth && requireAuth && !isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    if (!skipAuth && !requireAuth && isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};
