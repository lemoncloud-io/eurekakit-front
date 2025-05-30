import { webCore } from '@lemon/web-core';

import { ACTIVITY, CONTENT_ENDPOINT, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedActivityBody, FeedActivityParam } from '@lemoncloud/pets-socials-api';

export const reportFeed = async (feedId?: string, reason?: string) => {
    if (!feedId) {
        throw new Error('reportFeed - @feedId is required');
    }

    if (!reason) {
        throw new Error('reportFeed - @reason is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [CONTENT_ENDPOINT, FEEDS, feedId, ACTIVITY].join('/'),
        })
        .setParams({ report: true } satisfies FeedActivityParam)
        .setBody({ reason } satisfies FeedActivityBody)
        .execute<FeedView>();

    return data;
};
