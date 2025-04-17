import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { CommonRoutes } from './common';
import { ProtectedRoutes } from './protected';
import { PublicRoutes } from './public';
import App from '../app';

import type { RouteObject } from 'react-router-dom';

export const Router = () => {
    const router = createBrowserRouter([
        { element: <App />, children: [...ProtectedRoutes, ...PublicRoutes, ...CommonRoutes] },
    ] as RouteObject[]);

    return <RouterProvider router={router} />;
};
