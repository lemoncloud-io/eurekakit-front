import { SearchPage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const searchRoutes: RouteObject[] = [
    {
        index: true,
        element: <SearchPage />,
    },
];
