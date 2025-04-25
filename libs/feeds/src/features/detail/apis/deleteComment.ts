import { webCore } from '@lemon/web-core';

import { BACKEND_API, COMMENTS } from '../../../consts';

import type { CommentBody, CommentView } from '@lemoncloud/pets-socials-api';

export const deleteComment = async (commentId?: string) => {
    if (!commentId) {
        throw new Error('deleteComment - @commentId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [BACKEND_API, COMMENTS, commentId].join('/'),
        })
        .setBody({ hidden: true } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
