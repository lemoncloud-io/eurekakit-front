import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authRoutes } from '../features/auth';
import { commentRoutes } from '../features/comment';
import { HomePage, feedRoutes } from '../features/feed';
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
            { path: '/', element: <HomePage />, handle: { tabBar: true, requireAuth: true } },
            { path: '/feed/*', children: feedRoutes, handle: { requireAuth: true } },
            { path: '/user/*', children: userRoutes, handle: { requireAuth: true } },
            { path: '/comment/*', children: commentRoutes, handle: { requireAuth: true } },
            { path: `/auth/*`, children: authRoutes },
        ],
    },
];

const router = createBrowserRouter(routes as RouteObject[]);

export const Router = () => <RouterProvider router={router} />;
