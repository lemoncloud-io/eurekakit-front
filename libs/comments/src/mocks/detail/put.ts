import { HttpResponse, http } from 'msw';

import { db } from '@lemon/mock-db';

import { COMMENTS, CONTENT_ENDPOINT, HIDE } from '../../consts';

import type { CommentBody } from '../../types';

export const putHandler = [
    http.put([CONTENT_ENDPOINT, COMMENTS, ':commentId'].join('/'), async ({ request, params }) => {
        const commentId = params['commentId'] as string | undefined;

        if (!commentId) {
            return HttpResponse.json({ message: 'Invalid commentId' }, { status: 400 });
        }

        const body = (await request.json()) as CommentBody;

        if (!body) {
            return HttpResponse.json({ message: 'Invalid CommentBody' }, { status: 400 });
        }

        const uploadedImages = body.image$$ ?? [];

        const images = uploadedImages
            .map(image => db.image.findFirst({ where: { id: { equals: image.id } } }))
            .filter((image): image is NonNullable<typeof image> => image !== null);

        const comment = db.comment.update({
            where: { id: { equals: commentId } },
            data: { ...body, image$$: images, updatedAt: Date.now() },
        });

        return HttpResponse.json(comment);
    }),
    http.put([CONTENT_ENDPOINT, COMMENTS, ':commentId', HIDE].join('/'), ({ params }) => {
        const commentId = params['commentId'] as string | undefined;

        if (!commentId) {
            return HttpResponse.json({ message: 'Invalid commentId' }, { status: 400 });
        }

        const comment = db.comment.update({
            where: { id: { equals: commentId } },
            data: { hidden: true, updatedAt: Date.now() },
        });

        const feed = db.feed.findFirst({ where: { id: { equals: comment?.feedId } } });

        db.feed.update({
            where: { id: { equals: comment?.feedId } },
            data: { commentHidden: (feed?.commentHidden ?? 0) + 1 },
        });

        return HttpResponse.json(comment);
    }),
];
