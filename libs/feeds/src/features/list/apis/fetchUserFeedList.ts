import { webCore } from '@lemon/web-core';

import { FEEDS, PET_ENDPOINT, USERS } from '../../../consts/apis';

import type { FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';

// TODO : @luke-lemon feeds로 이동
export const fetchUserFeedList = async (id?: string, params?: Params) => {
    if (!id) {
        throw new Error('fetchUserFeed - @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [PET_ENDPOINT, USERS, id, FEEDS].join('/') })
        .setParams({ parent: true, ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
