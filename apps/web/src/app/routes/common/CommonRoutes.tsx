import { Outlet, type RouteObject } from 'react-router-dom';

import { NotFound } from '../../components';

const CommonRoute = () => {
    return <Outlet />;
};

export const CommonRoutes: RouteObject[] = [
    {
        element: <CommonRoute />,
        children: [{ path: '*', element: <NotFound /> }],
    },
];
