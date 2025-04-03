import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useWebCoreStore } from '@lemon/web-core';

import { CommonRoutes } from './common';
import { ProtectedRoutes } from './protected';
import { PublicRoutes } from './public';

export const Router = () => {
    const isAuthenticated = useWebCoreStore(state => state.isAuthenticated);

    const routes = isAuthenticated ? [...ProtectedRoutes, ...PublicRoutes] : PublicRoutes;
    const router = createBrowserRouter([...routes, ...CommonRoutes]);

    return <RouterProvider router={router} />;
};
