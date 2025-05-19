import { CreateFeedPage, FeedDetailPage, FeedPage, SearchPage, UpdateFeedPage } from '../pages';

import type { ExtendedRouteObject } from '../../../routes';

export const feedRoutes: ExtendedRouteObject[] = [
    { index: true, element: <FeedPage />, handle: { tabBar: true } },
    {
        path: 'create',
        element: <CreateFeedPage />,
        handle: { header: { title: '새로운 글쓰기', buttons: ['cancel'] } },
    },
    { path: 'search', element: <SearchPage /> },
    {
        path: ':feedId',
        children: [
            {
                index: true,
                element: <FeedDetailPage />,
                handle: { header: { buttons: ['back'] } },
            },
            {
                path: 'update',
                element: <UpdateFeedPage />,
                handle: { header: { title: '수정하기', buttons: ['cancel'] } },
            },
        ],
    },
];
