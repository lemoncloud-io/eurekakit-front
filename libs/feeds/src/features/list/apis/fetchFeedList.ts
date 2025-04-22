import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEEDS, LIST_V2 } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';

export const fetchFeedList = async (params?: FeedListParam) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [BACKEND_API, FEEDS, 0, LIST_V2].join('/') })
        .setParams({ mine: true, parent: true, activity: true, ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
