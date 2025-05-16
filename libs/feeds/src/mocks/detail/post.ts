import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

import { db, myId } from '@lemon/mock-db';

import { CONTENT_ENDPOINT, FEED, USERS } from '../../consts';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const postHandler = [
    http.post([CONTENT_ENDPOINT, USERS, '0', FEED].join('/'), async ({ request }) => {
        const body = (await request.json()) as FeedBody;

        if (!body) {
            return HttpResponse.json({ message: 'Invalid FeedBody' }, { status: 400 });
        }

        const uploadedImages = body['image$$'] ?? [];

        const images = uploadedImages
            .map(image => db.image.findFirst({ where: { id: { equals: image.id } } }))
            .filter((image): image is NonNullable<typeof image> => image !== null);

        const newFeed = db.feed.create({
            ...body,
            id: faker.string.uuid(),
            createdAt: Date.now(),
            likeCount: 0,
            viewCount: 0,
            userId: myId,
            hidden: false,
            image$$: images,
        });

        await delay(2000);

        return HttpResponse.json(newFeed);
    }),
];
