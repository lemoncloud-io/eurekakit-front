import { CreatePostPage, PostDetailPage, UpdatePostPage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const postRoutes: RouteObject[] = [
    {
        path: ':postId',
        element: <PostDetailPage />,
    },
    {
        path: 'create',
        element: <CreatePostPage />,
    },
    {
        path: 'update/:postId',
        element: <UpdatePostPage />,
    },
];
