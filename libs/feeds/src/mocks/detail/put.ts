import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { ACTIVITY, CONTENT_ENDPOINT, FEEDS } from '../../consts';

export const putHandler = [
    http.put([CONTENT_ENDPOINT, FEEDS, ':feedId'].join('/'), async ({ request, params }) => {
        const feedId = params['feedId'] as string;

        if (!feedId) {
            return HttpResponse.json({ message: 'Invalid feed id' }, { status: 400 });
        }

        const body = await request.json();

        const existingFeed = db.feed.findFirst({
            where: { id: { equals: feedId } },
        });

        if (!existingFeed) {
            return HttpResponse.json({ message: 'Feed not found' }, { status: 404 });
        }

        const updatedFeed = db.feed.update({
            where: { id: { equals: feedId } },
            data: {
                ...existingFeed,
                ...body,
            },
        });

        await delay(1000);

        return HttpResponse.json(updatedFeed);
    }),
    http.put([CONTENT_ENDPOINT, FEEDS, ':feedId', ACTIVITY].join('/'), async ({ request, params }) => {
        const feedId = params['feedId'] as string;
        const likeParam = new URL(request.url).searchParams.get('like');
        const isLike = likeParam === 'true';

        if (!feedId) {
            return HttpResponse.json({ message: 'Invalid feedId' }, { status: 400 });
        }

        const feed = db.feed.findFirst({
            where: { id: { equals: feedId } },
        });

        if (!feed) {
            return HttpResponse.json({ message: 'Feed not found' }, { status: 404 });
        }

        const updatedFeed = db.feed.update({
            where: { id: { equals: feedId } },
            data: {
                $activity: {
                    ...feed.$activity,
                    isLike,
                },
            },
        });

        await delay(1000);

        return HttpResponse.json(updatedFeed);
    }),
];
