import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, FEEDS, LIST_V2 } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { WithUsers } from '@lemon/users';

export const fetchFeedList = async (params?: FeedListParam) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [CONTENT_ENDPOINT, FEEDS, 0, LIST_V2].join('/') })
        .setParams({ mine: true, parent: true, activity: true, ...params })
        .execute<WithUsers<ListResult<FeedView>>>();

    return data;
};
