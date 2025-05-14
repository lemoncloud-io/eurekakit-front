import { CreateCommentPage, UpdateCommentPage } from '../pages';

import type { ExtendedRouteObject } from '../../../routes';

export const commentRoutes: ExtendedRouteObject[] = [
    {
        path: 'create',
        element: <CreateCommentPage />,
        handle: { header: { title: '답글 쓰기', buttons: ['cancel'] } },
    },
    {
        path: 'update/:commentId',
        element: <UpdateCommentPage />,
        handle: { header: { title: '수정하기', buttons: ['cancel'] } },
    },
];
