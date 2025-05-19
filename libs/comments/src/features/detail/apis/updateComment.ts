import { webCore } from '@lemon/web-core';

import { COMMENTS, CONTENT_ENDPOINT } from '../../../consts';

import type { CommentBody, CommentView } from '../../../types';

export const updateComment = async (commentId?: string, body?: CommentBody) => {
    if (!commentId) {
        throw new Error('updateComment - @commentId is required');
    }

    if (!body) {
        throw new Error('updateComment - @body is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [CONTENT_ENDPOINT, COMMENTS, commentId].join('/'),
        })
        .setBody({ ...body } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
