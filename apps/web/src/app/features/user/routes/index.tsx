import { ProfilePage, RecentViewPage, UserActivityPage, UserPage } from '../pages';
import { ProfileEditModalPage } from '../pages/ProfileEditModalPage';

import type { RouterHandle } from '../../../hooks';
import type { RouteObject } from 'react-router-dom';

export const userRoutes: RouteObject[] = [
    {
        index: true,
        element: <UserPage />,
        handle: { tabBar: true } as RouterHandle,
    },
    {
        path: 'activity',
        element: <UserActivityPage />,
        handle: { tabBar: true } as RouterHandle,
    },
    {
        path: 'viewed',
        element: <RecentViewPage />,
        handle: { tabBar: true } as RouterHandle,
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
