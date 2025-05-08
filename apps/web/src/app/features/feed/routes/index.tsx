import { CreatePostPage, FeedPage, HomePage, PostDetailPage, SearchPage, UpdatePostPage } from '../pages';

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
            { path: 'create', element: <CreatePostPage /> },
            { path: 'search', element: <SearchPage /> },
            {
                path: ':feedId',
                children: [
                    {
                        index: true,
                        element: <PostDetailPage />,
                    },
                    {
                        path: 'update',
                        element: <UpdatePostPage />,
                    },
                ],
            },
        ],
    },
];
