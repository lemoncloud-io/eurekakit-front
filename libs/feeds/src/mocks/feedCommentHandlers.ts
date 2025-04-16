import { HttpResponse, delay, http } from 'msw';

import { BACKEND_API, COMMENTS, FEEDS } from '../consts';
import { commentList } from './mockFeedComments';

import type { FeedView } from '../types';
import type { ListResult } from '@lemon/shared';

const mutableFeedCommentList = [...commentList];

export const feedCommentHandler = [
    http.get([BACKEND_API, FEEDS, ':feedId', COMMENTS].join('/'), async ({ request, params }) => {
        const page = Number(new URL(request.url).searchParams.get('page')) || 0;
        const limit = Number(new URL(request.url).searchParams.get('limit')) || 10;

        const startFeedIdx = page * limit;
        const endFeedIdx = Math.min((page + 1) * limit, mutableFeedCommentList.length);

        const parentId = params['feedId'];
        const totalCommentList = mutableFeedCommentList.filter(comment => comment.parentId === parentId);

        const responseCommentList = totalCommentList.slice(startFeedIdx, endFeedIdx);

        const response = {
            list: responseCommentList,
            total: totalCommentList.length,
            page,
            limit,
        } as ListResult<FeedView>;

        await delay(2000);

        return HttpResponse.json(response);
    }),
];
