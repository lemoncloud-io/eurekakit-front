import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';

import { feedsKeys } from '../../../consts';
import { fetchViewedFeedList } from '../apis';
import { attachUser$ToListResult } from '../utils';

import type { FeedListParam } from '../../../types';

// TODO : @luke-lemon infinite list를 따로 기능으로 뺴는게 나으려나
export const useFetchInfiniteViewedFeedList = (params?: FeedListParam) =>
    useSuspenseInfiniteQuery({
        // TODO : @luke-lemon 나중에 스키마로 빼던가 해야할 듯
        queryKey: feedsKeys.list({ ...params, viewed: true, parent: true, activity: true }, true),
        queryFn: ({ pageParam = 0 }) => fetchViewedFeedList({ ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: getListResultNextPage,
        select: data => {
            const flattenedList = flattenInfiniteListResult(data);

            const feedListWithUser$ = attachUser$ToListResult(flattenedList, flattenedList.Users);

            return feedListWithUser$;
        },
    });
