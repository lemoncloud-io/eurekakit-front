import { webCore } from '@lemon/web-core';

import { ACTIVITY, BACKEND_API, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';

export const reportFeed = async (id?: string, reason?: string) => {
    if (!id) {
        throw new Error('reportFeed - @id is required');
    }

    if (!reason) {
        throw new Error('reportFeed - @reason is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [BACKEND_API, FEEDS, id, ACTIVITY].join('/'),
        })
        .setParams({ report: true })
        .setBody({ reason })
        .execute<FeedView>();

    return data;
};
