import { webCore } from '@lemon/web-core';

import { ACTIVITY, BACKEND_API, COMMENTS } from '../../../consts';

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
            baseURL: [BACKEND_API, COMMENTS, commentId, ACTIVITY].join('/'),
        })
        .setParams({ report: true } satisfies ActivityParams)
        .setBody({ reason } satisfies FeedActivityBody)
        .execute<CommentView>();

    return data;
};
