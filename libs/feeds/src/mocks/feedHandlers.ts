import { HttpResponse, delay, http } from 'msw';

import { ACTIVITY, BACKEND_API, DETAIL, FEEDS, LIST_V2 } from '../consts';
import { feedList } from './mockFeeds';

import type { FeedView } from '../types';
import type { ListResult } from '@lemoncloud/codes-backend-api/dist/cores/types';

let mutableFeedList = [...feedList];

export const feedsHandler = [
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
    http.get([BACKEND_API, FEEDS, ':id', DETAIL].join('/'), async ({ request, params }) => {
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
];
