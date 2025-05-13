import { webCore } from '@lemon/web-core';

import { ACTIVITY, CONTENT_ENDPOINT, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedActivityParam } from '@lemoncloud/pets-socials-api';

export const likeFeed = async (feedId?: string, like?: boolean) => {
    if (!feedId) {
        throw new Error('likeFeed - @feedId is required');
    }

    like = !!like;

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [CONTENT_ENDPOINT, FEEDS, feedId, ACTIVITY].join('/'),
        })
        .setParams({ like } satisfies FeedActivityParam)
        .setBody({})
        .execute<FeedView>();

    return data;
};
