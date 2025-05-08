import { Navigate, Outlet } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { commentRoutes } from '../../features/comment';
import { feedRoutes } from '../../features/feed';
import { userRoutes } from '../../features/user';
import { TabBarLayout } from '../../layout/TabBarLayout';

import type { RouteObject } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useWebCoreStore();

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <TabBarLayout />,
                children: [
                    { path: '/', children: feedRoutes },
                    { path: '/user/*', children: userRoutes },
                ],
            },
            { path: '/comment/*', children: commentRoutes },
        ],
    },
];
