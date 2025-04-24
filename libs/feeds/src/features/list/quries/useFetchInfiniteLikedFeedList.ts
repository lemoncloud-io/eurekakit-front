import { useInfiniteQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchLikedFeedList } from '../apis';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';

export const useFetchInfiniteLikedFeedList = (params?: FeedListParam) =>
    useInfiniteQuery({
        queryKey: feedsKeys.list(params, true),
        queryFn: ({ pageParam = 0 }) => fetchLikedFeedList({ ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: lastPage => {
            const { page, total, limit } = lastPage;

            if (page == null || total == null || limit == null) {
                return undefined;
            }

            const maxPages = Math.ceil(total / limit);

            return page + 1 < maxPages ? page + 1 : undefined;
        },
        select: data => {
            return data.pages.reduce(
                (acc, cur) => {
                    return { ...acc, list: [...acc.list, ...cur.list] };
                },
                { list: [], total: data.pages[0].total } as ListResult<FeedView>
            );
        },
    });
