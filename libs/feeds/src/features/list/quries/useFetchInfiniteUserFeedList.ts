import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { flattenInfiniteListResult, getListResultNextPage } from '@lemon/shared';

import { feedsKeys } from '../../../consts';
import { fetchUserFeedList } from '../apis';

import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchInfiniteUserFeedList = (id?: string, params?: Params) =>
    useSuspenseInfiniteQuery({
        queryKey: feedsKeys.list({ parent: true, id, ...params }),
        queryFn: ({ pageParam = 0 }) => fetchUserFeedList(id, { ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: getListResultNextPage,
        select: flattenInfiniteListResult,
    });
