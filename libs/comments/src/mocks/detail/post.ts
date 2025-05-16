import { faker } from '@faker-js/faker';
import { http } from 'msw';

import { db, myId } from '@lemon/mock-db';

import { COMMENT, CONTENT_ENDPOINT, FEEDS } from '../../consts';

export const postHandler = [
    http.post([CONTENT_ENDPOINT, FEEDS, ':feedId', COMMENT].join('/'), async ({ request, params }) => {
        const feedId = params['feedId'];

        const body = await request.json();

        const comment = db.comment.create({ ...body, id: faker.string.uuid(), feedId, userId: myId });

        const feed = db.feed.findFirst({ where: { id: { equals: comment?.feedId } } });

        db.feed.update({
            where: { id: { equals: comment?.feedId } },
            data: { commentPosted: (feed?.commentPosted ?? 0) + 1 },
        });

        return Response.json(comment);
    }),
];
