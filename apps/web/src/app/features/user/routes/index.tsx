import { ProfilePage, RecentViewPage, UserActivityPage, UserPage } from '../pages';
import { ProfileEditModalPage } from '../pages/ProfileEditModalPage';

import type { ExtendedRouteObject } from '../../../routes';

export const userRoutes: ExtendedRouteObject[] = [
    {
        index: true,
        element: <UserPage />,
        handle: { tabBar: true },
    },
    {
        path: 'activity',
        element: <UserActivityPage />,
        handle: { tabBar: true },
    },
    {
        path: 'viewed',
        element: <RecentViewPage />,
        handle: { tabBar: true },
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
