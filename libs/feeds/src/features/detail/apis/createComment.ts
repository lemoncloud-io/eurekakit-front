import { webCore } from '@lemon/web-core';

import { BACKEND_API, COMMENTS, FEEDS } from '../../../consts';

import type { FeedView } from '../../../types';
import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const createComment = async (feedId?: string, commentBody?: FeedBody) => {
    if (!feedId) {
        throw new Error('createComment - @feedId is required');
    }

    if (!commentBody) {
        throw new Error('createComment - @commentBody is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: [BACKEND_API, FEEDS, feedId, COMMENTS].join('/'),
        })
        .setBody({ ...commentBody })
        .execute<FeedView>();

    return data;
};
