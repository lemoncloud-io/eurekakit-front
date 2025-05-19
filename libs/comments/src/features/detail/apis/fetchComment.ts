import { webCore } from '@lemon/web-core';

import { COMMENTS, CONTENT_ENDPOINT, DETAIL } from '../../../consts/apis';

import type { CommentListParams, CommentView } from '../../../types';

export const fetchComment = async (commentId?: string, params?: CommentListParams) => {
    if (!commentId) {
        throw new Error('fetchComment - @commentId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [CONTENT_ENDPOINT, COMMENTS, commentId, DETAIL].join('/'),
        })
        .setParams({ ...params })
        .execute<CommentView>();

    return data;
};
