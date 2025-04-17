import { webCore } from '@lemon/web-core';

import { BACKEND_API, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';

export const deleteFeed = async (id?: string) => {
    if (!id) {
        throw new Error('deleteFeed - @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'PUT', baseURL: [BACKEND_API, FEEDS, id].join('/') })
        .setBody({ hidden: true })
        .execute<FeedView>();

    return data;
};
