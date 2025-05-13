import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const updateFeed = async (feedId?: string, body?: FeedBody) => {
    if (!feedId) {
        throw new Error('updateFeed - @feedId is required');
    }

    if (!body) {
        throw new Error('updateFeed - @body is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'PUT', baseURL: [CONTENT_ENDPOINT, FEEDS, feedId].join('/') })
        .setBody({ ...body } satisfies FeedBody)
        .execute<FeedView>();

    return data;
};
