import { webCore } from '@lemon/web-core';

import { COMMENTS, DETAIL, PET_ENDPOINT } from '../../../consts';

import type { FeedListParam } from '../../../types';
import type { CommentView } from '@lemoncloud/pets-socials-api';

export const fetchComment = async (commentId?: string, params?: FeedListParam) => {
    if (!commentId) {
        throw new Error('fetchComment - @commentId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [PET_ENDPOINT, COMMENTS, commentId, DETAIL].join('/'),
        })
        .setParams({ ...params } satisfies FeedListParam)
        .execute<CommentView>();

    return data;
};
