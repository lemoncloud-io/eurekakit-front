import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { AuthRoutes } from '../../auth';

import type { RouteObject } from 'react-router-dom';

const AuthRedirect = () => {
    const location = useLocation();
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
};

export const PublicRoute = () => {
    const { isAuthenticated } = useWebCoreStore();

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export const PublicRoutes: RouteObject[] = [
    {
        element: <PublicRoute />,
        children: [
            { path: `/auth/*`, element: <AuthRoutes /> },
            {
                path: '*',
                element: <AuthRedirect />,
            },
        ],
    },
];
