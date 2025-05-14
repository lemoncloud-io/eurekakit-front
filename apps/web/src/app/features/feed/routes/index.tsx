import { CreateFeedPage, FeedDetailPage, FeedPage, SearchPage, UpdateFeedPage } from '../pages';

import type { ExtendedRouteObject } from '../../../routes';

export const feedRoutes: ExtendedRouteObject[] = [
    { index: true, element: <FeedPage />, handle: { tabBar: true } },
    { path: 'create', element: <CreateFeedPage /> },
    { path: 'search', element: <SearchPage /> },
    {
        path: ':feedId',
        children: [
            {
                index: true,
                element: <FeedDetailPage />,
            },
            {
                path: 'update',
                element: <UpdateFeedPage />,
            },
        ],
    },
];
