import { useInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';

import { commentKeys } from '../../../consts';
import { fetchUserCommentList } from '../apis';

import type { CommentListParams } from '../../../types';

export const useFetchInfiniteUserCommentList = (id?: string, params?: CommentListParams) =>
    useInfiniteQuery({
        //TODO : @luke-lemon 추후 스키마로 빼던지 해야할 듯.
        queryKey: commentKeys.list({ parent: false, id, ...params }),
        queryFn: ({ pageParam = 0 }) => fetchUserCommentList(id, { ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: getListResultNextPage,
        select: data => {
            const flattenedListResult = flattenInfiniteListResult(data);

            const activityComment = flattenedListResult.list.map(comment =>
                comment.Activity ? { ...comment, $activity: comment.Activity } : comment
            );

            return { ...flattenedListResult, list: activityComment };
        },
    });
