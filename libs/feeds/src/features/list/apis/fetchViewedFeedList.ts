import { webCore } from '@lemon/web-core';

import { FEEDS, PET_ENDPOINT, VIEWED } from '../../../consts';

import type { FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';

export const fetchViewedFeedList = async (params?: Params) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [PET_ENDPOINT, FEEDS, 0, VIEWED].join('/') })
        .setParams({ parent: true, activity: true, ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
