import { CreateFeedPage, FeedDetailPage, FeedPage, HomePage, SearchPage, UpdateFeedPage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const feedRoutes: RouteObject[] = [
    {
        index: true,
        element: <HomePage />,
    },
    {
        path: 'feed',
        children: [
            { index: true, element: <FeedPage /> },
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
        ],
    },
];
