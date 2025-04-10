import { Navigate, Outlet } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { HomeRoutes } from '../../features/home';

import type { RouteObject } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useWebCoreStore();

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute />,
        children: [{ path: `/home/*`, element: <HomeRoutes /> }],
    },
];
