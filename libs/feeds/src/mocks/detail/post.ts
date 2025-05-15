import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { CONTENT_ENDPOINT, FEED, USERS } from '../../consts';

export const postHandler = [
    http.post([CONTENT_ENDPOINT, USERS, '0', FEED].join('/'), async ({ request }) => {
        const body = await request.json();

        const newFeed = db.feed.create({
            ...body,
            id: faker.string.uuid(),
            createdAt: Date.now(),
            likeCount: 0,
            viewCount: 0,
            user$: { id: faker.string.uuid(), nick: 'DefaultUser' }, // 필요 시 추후 수정
            hidden: false,
        });

        await delay(2000);

        return HttpResponse.json(newFeed);
    }),
];
