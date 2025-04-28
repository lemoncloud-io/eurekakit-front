import { ProfilePage, RecentViewPage, UserActivityPage, UserPage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const userRoutes: RouteObject[] = [
    {
        index: true,
        element: <UserPage />,
    },
    {
        path: 'activity',
        element: <UserActivityPage />,
    },
    {
        path: 'viewed',
        element: <RecentViewPage />,
    },
    {
        path: 'profile',
        element: <ProfilePage />,
    },
];
