import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEEDS, LIST_V2 } from '../../../consts';

import type { FeedListParams } from '../../../types';
import type { ListResult } from '@lemoncloud/codes-backend-api/dist/cores/types';
import type { FeedView } from '@lemoncloud/pets-socials-api';

export const fetchFeedList = async (params?: FeedListParams) => {
    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [BACKEND_API, FEEDS, 0, LIST_V2].join('/') })
        .setParams({ ...params })
        .execute<ListResult<FeedView>>();

    return data;
};
