import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authRoutes } from '../features/auth';
import { commentRoutes } from '../features/comment';
import { feedRoutes } from '../features/feed';
import { HomePage } from '../features/feed/pages';
import { userRoutes } from '../features/user';
import { Layout } from '../layout/Layout';

import type { RouterHandle } from '../hooks';
import type { RouteObject } from 'react-router-dom';

export interface ExtendedRouteObject extends Omit<RouteObject, 'handle' | 'children'> {
    handle?: RouterHandle;
    children?: ExtendedRouteObject[];
}

const routes: ExtendedRouteObject[] = [
    {
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage />, handle: { tabBar: true } },
            { path: `/auth/*`, children: authRoutes },
            { path: '/feed/*', children: feedRoutes, handle: { requireAuth: true } },
            { path: '/user/*', children: userRoutes, handle: { requireAuth: true } },
            { path: '/comment/*', children: commentRoutes, handle: { requireAuth: true } },
        ],
    },
];

const router = createBrowserRouter(routes as RouteObject[]);

export const Router = () => <RouterProvider router={router} />;
