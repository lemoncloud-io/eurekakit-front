import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';
import { attachUser$ToListResult } from '@lemon/users';

import { feedsKeys } from '../../../consts';
import { fetchLikedFeedList } from '../apis';

import type { FeedListParam } from '../../../types';

export const useFetchInfiniteLikedFeedList = (params?: FeedListParam) =>
    useSuspenseInfiniteQuery({
        queryKey: feedsKeys.list(params, true),
        queryFn: ({ pageParam = 0 }) => fetchLikedFeedList({ ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: getListResultNextPage,
        select: data => {
            const flattenedList = flattenInfiniteListResult(data);

            const feedListWithUser$ = attachUser$ToListResult(flattenedList, flattenedList.Users);

            return feedListWithUser$;
        },
    });
