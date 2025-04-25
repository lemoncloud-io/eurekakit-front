import { webCore } from '@lemon/web-core';

import { BACKEND_API, COMMENT, FEEDS } from '../../../consts';

import type { CommentBody, CommentView } from '@lemoncloud/pets-socials-api';

export const createComment = async (feedId?: string, commentBody?: CommentBody) => {
    if (!feedId) {
        throw new Error('createComment - @feedId is required');
    }

    if (!commentBody) {
        throw new Error('createComment - @commentBody is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'POST',
            baseURL: [BACKEND_API, FEEDS, feedId, COMMENT].join('/'),
        })
        .setBody({ ...commentBody } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
