import { HttpResponse, delay, http } from 'msw';

import { BACKEND_API, FEEDS, LIST_V2 } from '../consts';
import { feedList } from './mockFeeds';

import type { FeedView } from '../types';
import type { ListResult } from '@lemoncloud/codes-backend-api/dist/cores/types';

export const feedsHandler = [
    http.get([BACKEND_API, FEEDS, 0, LIST_V2].join('/'), async ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, feedList.length);

        const responseFeedList = feedList.slice(startFeedIdx, endFeedIdx);

        await delay(1000);

        return HttpResponse.json({
            list: responseFeedList,
            total: feedList.length,
            page,
            limit,
        } as ListResult<FeedView>);
    }),
];
