import { HomePage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const homeRoutes: RouteObject[] = [
    {
        index: true,
        element: <HomePage />,
    },
];
