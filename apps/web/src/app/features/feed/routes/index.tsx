import { CreateFeedPage, FeedDetailPage, FeedPage, SearchPage, UpdateFeedPage } from '../pages';

import type { RouterHandle } from '../../../hooks';
import type { RouteObject } from 'react-router-dom';

export const feedRoutes: RouteObject[] = [
    { index: true, element: <FeedPage />, handle: { tabBar: true } as RouterHandle },
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
