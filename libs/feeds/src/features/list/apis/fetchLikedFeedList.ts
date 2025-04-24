import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEEDS, LIKED } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';

export const fetchLikedFeedList = async (params?: FeedListParam) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [BACKEND_API, FEEDS, 0, LIKED].join('/') })
        .setParams({ mine: true, parent: true, activity: true, ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
