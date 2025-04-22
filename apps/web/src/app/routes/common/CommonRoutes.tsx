import { Outlet, type RouteObject } from 'react-router-dom';

import { NotFound } from '../../components';
import { LogoutPage } from '../../features/auth/pages';

const CommonRoute = () => {
    return <Outlet />;
};

export const CommonRoutes: RouteObject[] = [
    { path: '/auth/logout', element: <LogoutPage /> },
    {
        element: <CommonRoute />,
        children: [{ path: '*', element: <NotFound /> }],
    },
];
