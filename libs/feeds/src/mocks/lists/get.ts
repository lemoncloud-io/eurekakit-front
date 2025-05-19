import { HttpResponse, delay, http } from 'msw';

import { db } from '@lemon/mock-db';

import { CONTENT_ENDPOINT, FEEDS, HELLO, LIKED, LIST, LIST_V2, USERS } from '../../consts';

import type { ListResult } from '@lemon/shared';
import type { FeedView } from '@lemoncloud/pets-socials-api';

export const listGetHandler = [
    http.get([CONTENT_ENDPOINT, FEEDS, 0, LIST_V2].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;
        const skip = page * limit;

        const list = db.feed.findMany({
            skip,
            take: limit,
            where: { hidden: { equals: false } },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const total = db.feed.count({ where: { hidden: { equals: false } } });

        const userIds = list.map(feed => feed.userId);
        const Users = db.user.getAll().filter(user => userIds.includes(user.id));

        await delay(1000);

        return HttpResponse.json({
            list,
            total,
            page,
            limit,
            Users,
        } as ListResult<FeedView>);
    }),
    http.get([CONTENT_ENDPOINT, FEEDS, 0, LIKED].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const allFeeds = db.feed.findMany({
            where: { hidden: { equals: false } },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const likedFeeds = allFeeds.filter(feed => feed.$activity.isLike);

        const paginated = likedFeeds.slice(page * limit, (page + 1) * limit);

        const userIds = paginated.map(feed => feed.userId);
        const Users = db.user.getAll().filter(user => userIds.includes(user.id));

        await delay(1000);

        return HttpResponse.json({
            list: paginated,
            total: likedFeeds.length,
            page,
            limit,
            Users,
        } as ListResult<FeedView>);
    }),
    http.get([CONTENT_ENDPOINT, USERS, ':userId', FEEDS].join('/'), async ({ request, params }) => {
        const userId = params['userId'] as string | undefined;

        if (!userId) {
            return HttpResponse.json({ message: 'Invalid userId' }, { status: 400 });
        }

        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;
        const skip = page * limit;

        const allFeedsByUser = db.feed.findMany({
            skip,
            take: limit,
            where: {
                userId: { equals: userId },
                hidden: { equals: false },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const total = db.feed.count({
            where: {
                userId: { equals: userId },
                hidden: { equals: false },
            },
        });

        await delay(1000);

        return HttpResponse.json({
            list: allFeedsByUser,
            total,
            page,
            limit,
        } as ListResult<FeedView>);
    }),
    http.get([CONTENT_ENDPOINT, HELLO, FEEDS, LIST].join('/'), async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 0;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const keyword = url.searchParams.get('keyword') || '';

        if (!keyword) {
            return HttpResponse.json({ message: 'Invalid keyword' }, { status: 400 });
        }

        const searchedFeedList = db.feed.findMany({
            where: { text: { contains: keyword.toLowerCase() } },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const total = searchedFeedList.length;
        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, total);

        const responseFeedList = searchedFeedList.slice(startFeedIdx, endFeedIdx);

        const userIds = responseFeedList.map(feed => feed.userId);
        const Users = db.user.getAll().filter(user => userIds.includes(user.id));

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total,
            page,
            limit,
            Users,
        });
    }),
];
