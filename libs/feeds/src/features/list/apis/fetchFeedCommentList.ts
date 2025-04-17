import { webCore } from '@lemon/web-core';

import { BACKEND_API, COMMENTS, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';

export const fetchFeedCommentList = async (feedId?: string, params?: Params) => {
    if (!feedId) {
        throw new Error('fetchFeedChildList - @feedId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [BACKEND_API, FEEDS, feedId, COMMENTS].join('/'),
        })
        .setParams({ ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
