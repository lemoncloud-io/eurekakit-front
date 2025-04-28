import { Navigate, Outlet } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { commentRoutes } from '../../features/comment';
import { feedRoutes } from '../../features/feed';
import { homeRoutes } from '../../features/home';
import { postRoutes } from '../../features/post';
import { searchRoutes } from '../../features/search';
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
                    { path: `/home/*`, children: [...homeRoutes] },
                    { path: '/feed/*', children: [...feedRoutes] },
                    { path: '/user/*', children: [...userRoutes] },
                ],
            },
            { path: `/post/*`, children: [...postRoutes] },
            { path: '/comment/*', children: [...commentRoutes] },
            { path: '/search/*', children: [...searchRoutes] },
        ],
    },
];
