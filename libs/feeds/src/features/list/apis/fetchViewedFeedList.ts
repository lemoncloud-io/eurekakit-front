import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, FEEDS, VIEWED } from '../../../consts';

import type { FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { WithUsers } from '@lemon/users';
import type { Params } from '@lemoncloud/lemon-web-core';

export const fetchViewedFeedList = async (params?: Params) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [CONTENT_ENDPOINT, FEEDS, 0, VIEWED].join('/') })
        .setParams({ parent: true, activity: true, ...params })
        .execute<WithUsers<ListResult<FeedView>>>();

    return data;
};
