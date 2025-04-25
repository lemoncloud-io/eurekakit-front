import { webCore } from '@lemon/web-core';

import { ACTIVITY, COMMENTS, PET_ENDPOINT } from '../../../consts';

import type { ActivityParams, CommentView } from '@lemoncloud/pets-socials-api';

export const likeComment = async (commentId?: string, isLike?: boolean) => {
    if (!commentId) {
        throw new Error('likeComment - @commentId is required');
    }

    if (isLike === undefined || isLike === null) {
        throw new Error('likeComment - @isLike is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [PET_ENDPOINT, COMMENTS, commentId, ACTIVITY].join('/'),
        })
        .setParams({ like: isLike } satisfies ActivityParams)
        .setBody({})
        .execute<CommentView>();

    return data;
};
