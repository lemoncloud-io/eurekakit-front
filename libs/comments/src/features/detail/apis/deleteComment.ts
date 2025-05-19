import { webCore } from '@lemon/web-core';

import { COMMENTS, CONTENT_ENDPOINT, HIDE } from '../../../consts';

import type { CommentBody, CommentView } from '../../../types';

export const deleteComment = async (commentId?: string) => {
    if (!commentId) {
        throw new Error('deleteComment - @commentId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [CONTENT_ENDPOINT, COMMENTS, commentId, HIDE].join('/'),
        })
        .setBody({ hidden: true } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
