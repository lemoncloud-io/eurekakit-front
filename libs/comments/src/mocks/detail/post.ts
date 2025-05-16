import { faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';

import { db, myId } from '@lemon/mock-db';

import { COMMENT, CONTENT_ENDPOINT, FEEDS } from '../../consts';

import type { CommentBody } from '../../types';

export const postHandler = [
    http.post([CONTENT_ENDPOINT, FEEDS, ':feedId', COMMENT].join('/'), async ({ request, params }) => {
        const feedId = params['feedId'] as string | undefined;

        if (!feedId) {
            return HttpResponse.json({ message: 'Invalid feedId' }, { status: 400 });
        }

        const body = (await request.json()) as CommentBody;

        if (!body) {
            return HttpResponse.json({ message: 'Invalid CommentBody' }, { status: 400 });
        }

        const uploadedImages = body.image$$ ?? [];

        const images = uploadedImages
            .map(image => db.image.findFirst({ where: { id: { equals: image.id } } }))
            .filter((image): image is NonNullable<typeof image> => image !== null);

        const comment = db.comment.create({ ...body, id: faker.string.uuid(), feedId, userId: myId, image$$: images });

        const feed = db.feed.findFirst({ where: { id: { equals: comment?.feedId } } });

        db.feed.update({
            where: { id: { equals: comment?.feedId } },
            data: { commentPosted: (feed?.commentPosted ?? 0) + 1 },
        });

        return Response.json(comment);
    }),
];
