import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { ACTIVITY, CONTENT_ENDPOINT, FEEDS } from '../../consts';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const putHandler = [
    http.put([CONTENT_ENDPOINT, FEEDS, ':feedId'].join('/'), async ({ request, params }) => {
        const feedId = params['feedId'] as string;

        if (!feedId) {
            return HttpResponse.json({ message: 'Invalid feed id' }, { status: 400 });
        }

        const body = (await request.json()) as FeedBody;

        if (!body) {
            return HttpResponse.json({ message: 'Invalid FeedBody' }, { status: 400 });
        }

        const uploadedImages = body['image$$'] ?? [];

        const images = uploadedImages
            .map(image => db.image.findFirst({ where: { id: { equals: image.id } } }))
            .filter((image): image is NonNullable<typeof image> => image !== null);

        const existingFeed = db.feed.findFirst({
            where: { id: { equals: feedId } },
        });

        if (!existingFeed) {
            return HttpResponse.json({ message: 'Feed not found' }, { status: 404 });
        }

        const updatedFeed = db.feed.update({
            where: { id: { equals: feedId } },
            data: {
                ...body,
                updatedAt: Date.now(),
                image$$: images,
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
