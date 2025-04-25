import { webCore } from '@lemon/web-core';

import { FEED, PET_ENDPOINT, USERS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const createFeed = async (body: FeedBody) => {
    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: [PET_ENDPOINT, USERS, 0, FEED].join('/'),
        })
        .setBody({ ...body } satisfies FeedBody)
        .execute<FeedView>();

    return data;
};
