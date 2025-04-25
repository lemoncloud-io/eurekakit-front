import { webCore } from '@lemon/web-core';

import { FEEDS, PET_ENDPOINT } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const deleteFeed = async (feedId?: string) => {
    if (!feedId) {
        throw new Error('deleteFeed - @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'PUT', baseURL: [PET_ENDPOINT, FEEDS, feedId].join('/') })
        .setBody({ hidden: true } satisfies FeedBody)
        .execute<FeedView>();

    return data;
};
