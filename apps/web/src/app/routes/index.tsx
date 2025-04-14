import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { CommonRoutes } from './common';
import { ProtectedRoutes } from './protected';
import { PublicRoutes } from './public';

export const Router = () => {
    const router = createBrowserRouter([...ProtectedRoutes, ...PublicRoutes, ...CommonRoutes]);

    return <RouterProvider router={router} />;
};
