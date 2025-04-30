import { fetchComment } from '@lemon/comments';

import { CreateCommentPage, UpdateCommentPage } from '../pages';

import type { RouteObject } from 'react-router-dom';

export const commentRoutes: RouteObject[] = [
    {
        path: 'create',
        element: <CreateCommentPage />,
    },
    {
        path: 'update/:commentId',
        loader: async ({ params }) => {
            const commentId = params.commentId;
            if (!commentId) throw new Error('Comment ID is required');
            const comment = await fetchComment(commentId);
            return { comment };
        },
        element: <UpdateCommentPage />,
    },
];
