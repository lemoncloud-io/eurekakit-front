import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEED, USERS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const createFeed = async (body: FeedBody) => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: [BACKEND_API, USERS, 0, FEED].join('/'),
        })
        .setBody({ ...body })
        .execute<FeedView>();

    return data;
};
