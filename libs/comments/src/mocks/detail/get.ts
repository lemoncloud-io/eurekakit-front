import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { COMMENTS, CONTENT_ENDPOINT, DETAIL } from '../../consts';

export const getHandler = [
    http.get([CONTENT_ENDPOINT, COMMENTS, ':commentId', DETAIL].join('/'), async ({ params }) => {
        const commentId = params['commentId'] as string | undefined;

        if (!commentId) {
            return HttpResponse.json({ message: 'Invalid commentId' }, { status: 400 });
        }

        const comment = db.comment.findFirst({ where: { id: { equals: commentId } } });
        const commentOwner = db.user.findFirst({ where: { id: { equals: comment?.userId } } });

        await delay(1000);

        return HttpResponse.json({ ...comment, user$: commentOwner });
    }),
];
