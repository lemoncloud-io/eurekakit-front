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
        handle: { tabBar: true, header: { title: '내 활동 내역', buttons: ['back'] } },
    },
    {
        path: 'viewed',
        element: <RecentViewPage />,
        handle: { tabBar: true, header: { title: '최근 본 글', buttons: ['back'] } },
    },
    {
        path: 'profile',
        element: <ProfilePage />,
        handle: { header: { title: '프로필 수정', buttons: ['back'] } },
    },
    {
        path: 'profile-modal',
        element: <ProfileEditModalPage />,
    },
];
