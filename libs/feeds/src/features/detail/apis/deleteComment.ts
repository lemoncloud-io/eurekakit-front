import { webCore } from '@lemon/web-core';

import { COMMENTS, PET_ENDPOINT } from '../../../consts';

import type { CommentBody, CommentView } from '@lemoncloud/pets-socials-api';

export const deleteComment = async (commentId?: string) => {
    if (!commentId) {
        throw new Error('deleteComment - @commentId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [PET_ENDPOINT, COMMENTS, commentId].join('/'),
        })
        .setBody({ hidden: true } satisfies CommentBody)
        .execute<CommentView>();

    return data;
};
