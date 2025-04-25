import { webCore } from '@lemon/web-core';

import { FEEDS, LIST_V2, PET_ENDPOINT } from '../../../consts';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';

export const fetchFeedList = async (params?: FeedListParam) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [PET_ENDPOINT, FEEDS, 0, LIST_V2].join('/') })
        .setParams({ mine: true, parent: true, activity: true, ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
