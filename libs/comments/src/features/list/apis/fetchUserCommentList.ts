import { webCore } from '@lemon/web-core';

import { CONTENT_ENDPOINT, FEEDS, USERS } from '../../../consts/apis';

import type { CommentListParams, CommentView } from '../../../types';
import type { ListResult } from '@lemon/shared';

// TODO : @luke-lemon feeds로 이동
export const fetchUserCommentList = async (id?: string, params?: CommentListParams) => {
    if (!id) {
        throw new Error('fetchUserCommentList - @id is required');
    }

    const { data } = await webCore
        .buildSignedRequest({ method: 'GET', baseURL: [CONTENT_ENDPOINT, USERS, id, FEEDS].join('/') })
        .setParams({ parent: false, ...params })
        .execute<ListResult<CommentView>>();

    return data;
};
