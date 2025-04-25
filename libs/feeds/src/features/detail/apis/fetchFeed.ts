import { webCore } from '@lemon/web-core';

import { DETAIL, FEEDS, PET_ENDPOINT } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';

export const fetchFeed = async (feedId?: string, params?: FeedListParam) => {
    if (!feedId) {
        throw new Error('fetchFeed - @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [PET_ENDPOINT, FEEDS, feedId, DETAIL].join('/'),
        })
        .setParams({ ...params } satisfies FeedListParam)
        .execute<FeedView>();

    return data;
};
