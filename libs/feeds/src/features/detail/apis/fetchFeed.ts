import { webCore } from '@lemon/web-core';

import { BACKEND_API, DETAIL, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { Params } from '@lemoncloud/lemon-web-core';

export const fetchFeed = async (id?: string, params?: Params) => {
    if (!id) {
        throw new Error('fetchFeed - @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [BACKEND_API, FEEDS, id, DETAIL].join('/'),
        })
        .setParams({ ...params })
        .execute<FeedView>();

    return data;
};
