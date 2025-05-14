import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';

import { commentKeys } from '../../../consts';
import { fetchFeedCommentList } from '../apis';
import { attachUser$ToListResult } from '../utils';

import type { CommentListParams } from '../../../types';

export const useFetchInfiniteFeedCommentList = (feedId?: string, params?: CommentListParams) =>
    useSuspenseInfiniteQuery({
        queryKey: commentKeys.list({ feedId }, true),
        queryFn: ({ pageParam = 0 }) => fetchFeedCommentList(feedId, { ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: getListResultNextPage,
        select: data => {
            const flattenedListResult = flattenInfiniteListResult(data);
            const commentListWithUser = attachUser$ToListResult(flattenedListResult, flattenedListResult.Users);

            const activityComment = commentListWithUser.list.map(comment =>
                comment.Activity ? { ...comment, $activity: comment.Activity } : comment
            );

            return { ...commentListWithUser, list: activityComment };
        },
    });
