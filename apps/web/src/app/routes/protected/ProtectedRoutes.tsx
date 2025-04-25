import { Navigate, Outlet } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { CommentRoutes } from '../../features/comment';
import { FeedRoutes } from '../../features/feed';
import { HomeRoutes } from '../../features/home';
import { PostRoutes } from '../../features/post';
import { SearchRoutes } from '../../features/search';
import { UserRoutes } from '../../features/user';
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
                    { path: `/home/*`, element: <HomeRoutes /> },
                    { path: '/feed/*', element: <FeedRoutes /> },
                    { path: '/user/*', element: <UserRoutes /> },
                ],
            },
            { path: `/post/*`, element: <PostRoutes /> },
            { path: '/comment/*', element: <CommentRoutes /> },
            { path: '/search/*', element: <SearchRoutes /> },
        ],
    },
];
