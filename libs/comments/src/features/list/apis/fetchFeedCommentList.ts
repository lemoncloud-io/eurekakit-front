import { webCore } from '@lemon/web-core';

import { COMMENTS, FEEDS, PET_ENDPOINT } from '../../../consts';

import type { CommentListParams, CommentView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { WithUsers } from '@lemon/users';

export const fetchFeedCommentList = async (feedId?: string, params?: CommentListParams) => {
    if (!feedId) {
        throw new Error('fetchFeedChildList - @feedId is required');
    }

    const { data } = await webCore
        .buildSignedRequest({
            method: 'GET',
            baseURL: [PET_ENDPOINT, FEEDS, feedId, COMMENTS].join('/'),
        })
        .setParams({ activity: true, ...params })
        .execute<WithUsers<ListResult<CommentView>>>();

    return data;
};
