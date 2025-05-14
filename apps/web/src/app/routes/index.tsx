import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authRoutes } from '../features/auth';
import { commentRoutes } from '../features/comment';
import { feedRoutes } from '../features/feed';
import { HomePage } from '../features/feed/pages';
import { userRoutes } from '../features/user';
import { Layout } from '../layout/Layout';

import type { RouterHandle } from '../hooks';
import type { RouteObject } from 'react-router-dom';

export const Router = () => {
    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                { path: '/', element: <HomePage />, handle: { tabBar: true } as RouterHandle },
                { path: `/auth/*`, children: authRoutes },
                { path: '/feed/*', children: feedRoutes },
                { path: '/user/*', children: userRoutes },
                { path: '/comment/*', children: commentRoutes },
            ],
        },
    ] as RouteObject[]);

    return <RouterProvider router={router} />;
};
