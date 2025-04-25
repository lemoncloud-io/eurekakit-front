import { webCore } from '@lemon/web-core';

import { BACKEND_API, COMMENTS } from '../../../consts';

import type { CommentBody, CommentView } from '@lemoncloud/pets-socials-api';

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
            baseURL: [BACKEND_API, COMMENTS, commentId].join('/'),
        })
        .setBody({ ...body } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
