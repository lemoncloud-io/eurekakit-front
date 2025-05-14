import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';

import { feedsKeys } from '../../../consts';
import { searchFeed } from '../apis';
import { attachUser$ToListResult } from '../utils';

import type { FeedListParam } from '../../../types';

export const useSearchFeed = (params?: FeedListParam) =>
    useSuspenseInfiniteQuery({
        queryKey: feedsKeys.list(params, true),
        queryFn: ({ pageParam = 0 }) => searchFeed({ ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: getListResultNextPage,
        select: data => {
            const flattenedList = flattenInfiniteListResult(data);

            const feedListWithUser$ = attachUser$ToListResult(flattenedList, flattenedList.Users);

            return feedListWithUser$;
        },
    });
