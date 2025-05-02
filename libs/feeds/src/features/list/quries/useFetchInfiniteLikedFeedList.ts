import { useInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';

import { feedsKeys } from '../../../consts';
import { fetchLikedFeedList } from '../apis';
import { attachUser$ToListResult } from '../utils';

import type { FeedListParam } from '../../../types';

export const useFetchInfiniteLikedFeedList = (params?: FeedListParam) =>
    useInfiniteQuery({
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
