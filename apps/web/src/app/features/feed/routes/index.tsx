import { FeedPage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const feedRoutes: RouteObject[] = [
    {
        index: true,
        element: <FeedPage />,
    },
];
