import { webCore } from '@lemon/web-core';

import { ACTIVITY, COMMENTS, PET_ENDPOINT } from '../../../consts';

import type { ActivityParams, CommentView, FeedActivityBody } from '@lemoncloud/pets-socials-api';

export const reportComment = async (commentId?: string, reason?: string) => {
    if (!commentId) {
        throw new Error('reportComment - @commentId is required');
    }

    if (!reason) {
        throw new Error('reportComment - @reason is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'PUT',
            baseURL: [PET_ENDPOINT, COMMENTS, commentId, ACTIVITY].join('/'),
        })
        .setParams({ report: true } satisfies ActivityParams)
        .setBody({ reason } satisfies FeedActivityBody)
        .execute<CommentView>();

    return data;
};
