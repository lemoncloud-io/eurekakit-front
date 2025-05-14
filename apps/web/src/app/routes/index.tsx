import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from '../app';
import { RedirectByAuth, authRoutes } from '../features/auth';
import { commentRoutes } from '../features/comment';
import { HomePage, feedRoutes } from '../features/feed';
import { userRoutes } from '../features/user';
import { Layout } from '../layout/Layout';

import type { RouteHandle } from '../hooks';
import type { RouteObject } from 'react-router-dom';

export interface ExtendedRouteObject extends Omit<RouteObject, 'handle' | 'children'> {
    handle?: RouteHandle;
    children?: ExtendedRouteObject[];
}

const routes: ExtendedRouteObject[] = [
    {
        element: <App />,
        children: [
            {
                element: <Layout />,
                children: [
                    { path: '/', element: <HomePage />, handle: { tabBar: true, type: 'protected' } },
                    { path: '/feed/*', children: feedRoutes, handle: { type: 'protected' } },
                    { path: '/user/*', children: userRoutes, handle: { type: 'protected' } },
                    { path: '/comment/*', children: commentRoutes, handle: { type: 'protected' } },
                    { path: `/auth/*`, children: authRoutes, handle: { type: 'restricted' } },
                    { path: `*`, element: <RedirectByAuth /> },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(routes as RouteObject[]);

export const Router = () => <RouterProvider router={router} />;
