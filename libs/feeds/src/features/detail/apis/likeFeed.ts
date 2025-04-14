import { webCore } from '@lemon/web-core';

import { ACTIVITY, BACKEND_API, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedActivityParam } from '@lemoncloud/pets-socials-api';

export const likeFeed = async (id?: string, like?: boolean) => {
    if (!id) {
        throw new Error('likeFeed - @id is required');
    }

    like = !!like;

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [BACKEND_API, FEEDS, id, ACTIVITY].join('/'),
        })
        .setParams({ like } satisfies FeedActivityParam)
        .execute<FeedView>();

    return data;
};
