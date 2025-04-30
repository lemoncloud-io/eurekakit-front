import { ProfilePage, RecentViewPage, UserActivityPage, UserPage } from '../pages';
import { ProfileEditModalPage } from '../pages/ProfileEditModalPage';

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
    {
        path: 'profile-modal',
        element: <ProfileEditModalPage />,
    },
];
