import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, FEEDS, LIKED } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { WithUsers } from '@lemon/users';

export const fetchLikedFeedList = async (params?: FeedListParam) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [CONTENT_ENDPOINT, FEEDS, 0, LIKED].join('/') })
        .setParams({ mine: true, parent: true, activity: true, ...params })
        .execute<WithUsers<ListResult<FeedView>>>();

    return data;
};
