import { HttpResponse, http } from 'msw';

import { BACKEND_API, COMMENTS, FEEDS } from '../consts';
import { commentList } from './mockFeedComments';

import type { FeedView } from '../types';
import type { ListResult } from '@lemon/shared';

export const feedCommentHandler = [
    http.get([BACKEND_API, FEEDS, ':feedId', COMMENTS].join('/'), ({ request, params }) => {
        const page = new URLSearchParams(request.url).get('page') || 0;
        const limit = new URLSearchParams(request.url).get('limit') || 10;

        const parentId = params['feedId'];
        const targetFeedCommentList = commentList.filter(comment => comment.parentId === parentId);

        const response = {
            list: targetFeedCommentList,
            total: targetFeedCommentList.length,
            page,
            limit,
        } as ListResult<FeedView>;

        return HttpResponse.json(response);
    }),
];
