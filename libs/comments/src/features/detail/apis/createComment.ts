import { webCore } from '@lemon/web-core';

import { COMMENT, CONTENT_ENDPOINT, FEEDS } from '../../../consts';

import type { CommentBody, CommentView } from '../../../types';

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
            baseURL: [CONTENT_ENDPOINT, FEEDS, feedId, COMMENT].join('/'),
        })
        .setBody({ ...commentBody } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
