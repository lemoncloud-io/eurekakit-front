import { HttpResponse, delay, http } from 'msw';

import { createFeedItem, feedList } from './mockFeeds';
import { ACTIVITY, BACKEND_API, DETAIL, FEED, FEEDS, LIST_V2, USERS } from '../../consts';

import type { FeedView } from '../../types';
import type { ListResult } from '@lemon/shared';

let mutableFeedList = [...feedList];

export const feedHandler = [
    http.get([BACKEND_API, FEEDS, 0, LIST_V2].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, mutableFeedList.length);

        const responseFeedList = mutableFeedList.slice(startFeedIdx, endFeedIdx);

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total: mutableFeedList.length,
            page,
            limit,
        } as ListResult<FeedView>);
    }),
    http.get([BACKEND_API, FEEDS, ':id', DETAIL].join('/'), async ({ params }) => {
        const feedId = params['id'];

        const targetFeed = mutableFeedList.find(feed => feed.id === feedId);

        await delay(1000);

        if (!targetFeed) {
            return HttpResponse.error();
        }

        return HttpResponse.json(targetFeed);
    }),
    http.put([BACKEND_API, FEEDS, ':id', ACTIVITY].join('/'), async ({ request, params }) => {
        const feedId = params['id'];

        const toBeLike = JSON.parse(new URL(request.url).searchParams.get('like')!) as boolean;

        const targetFeed = mutableFeedList.find(feed => feed.id === feedId)!;
        const toBeFeed = {
            ...targetFeed,
            $activity: { ...targetFeed?.$activity, isLike: toBeLike },
        };

        mutableFeedList = mutableFeedList.map(feed => (feed.id !== targetFeed.id ? feed : toBeFeed));

        await delay(1000);

        return HttpResponse.json(toBeFeed);
    }),
    http.post([BACKEND_API, USERS, 0, FEED].join('/'), async ({ request }) => {
        const body = await request.json();

        const nextId = Math.max(...mutableFeedList.map(feed => Number(feed.id ?? 0)));

        const newFeed = {
            ...createFeedItem(nextId + 1),
            createdAt: Date.now(),
            text: body['text'],
            image$$: body['images'],
            user$: { id: '1', nick: 'DefaultUser' },
            likeCount: 0,
            childNo: 0,
        } as FeedView;

        await delay(2000);

        mutableFeedList.unshift(newFeed);

        return HttpResponse.json(newFeed);
    }),
];
