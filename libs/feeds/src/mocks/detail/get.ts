import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { CONTENT_ENDPOINT, DETAIL, FEEDS } from '../../consts';

import type { FeedView } from '../../types';

export const getHandler = [
    http.get([CONTENT_ENDPOINT, FEEDS, ':feedId', DETAIL].join('/'), async ({ params }) => {
        const feedId = params['feedId'] as string;

        if (!feedId) {
            return HttpResponse.json({ message: 'Invalid feedId' }, { status: 400 });
        }

        const targetFeed = db.feed.findFirst({
            where: { id: { equals: feedId }, hidden: { equals: false } },
        });

        const feedOwner = db.user.findFirst({ where: { id: { equals: targetFeed?.userId } } });

        await delay(1000);

        if (!targetFeed) {
            return HttpResponse.json({ message: 'Feed not found' }, { status: 404 });
        }

        return HttpResponse.json({ ...targetFeed, user$: feedOwner } as FeedView);
    }),
];
