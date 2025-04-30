import { webCore } from '@lemon/web-core';

import { ACTIVITY, COMMENTS, PET_ENDPOINT } from '../../../consts';

import type { CommentActivityParams, CommentView } from '../../../types';

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
        .setParams({ like: isLike } satisfies CommentActivityParams)
        .setBody({})
        .execute<CommentView>();

    return data;
};
