import { HttpResponse, http } from 'msw';

import { db } from '@lemon/mock-db';

import { COMMENTS, CONTENT_ENDPOINT } from '../../consts';

export const putHandler = [
    http.put([CONTENT_ENDPOINT, COMMENTS, ':commentId'].join('/'), async ({ request, params }) => {
        const commentId = params['commentId'] as string | undefined;

        if (!commentId) {
            return HttpResponse.json({ message: 'Invalid commentId' }, { status: 400 });
        }

        const body = await request.json();

        const comment = db.comment.update({
            where: { id: { equals: commentId } },
            data: { ...body, updateAt: Date.now() },
        });

        return HttpResponse.json(comment);
    }),
];
