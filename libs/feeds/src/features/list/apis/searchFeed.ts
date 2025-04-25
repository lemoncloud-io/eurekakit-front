import { webCore } from '@lemon/web-core';

import { FEEDS, HELLO, LIST, PET_ENDPOINT } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';

export const searchFeed = async (params: FeedListParam) => {
    if (!params.keyword) {
        throw new Error('searchFeedList - @params.keyword is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [PET_ENDPOINT, HELLO, FEEDS, LIST].join('/'),
        })
        .setParams({ mine: true, parent: true, activity: true, ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
