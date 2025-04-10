import { Navigate, Outlet } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { AuthRoutes } from '../../features/auth';

import type { RouteObject } from 'react-router-dom';

export const PublicRoute = () => {
    const { isAuthenticated } = useWebCoreStore();

    import.meta.env.DEV ?? console.log('public routes', !isAuthenticated);

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export const PublicRoutes: RouteObject[] = [
    {
        element: <PublicRoute />,
        children: [{ path: `/auth/*`, element: <AuthRoutes /> }],
    },
];
