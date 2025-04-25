import { useInfiniteQuery } from '@tanstack/react-query';

import { userKeys } from '../../../consts/userKeys';
import { fetchUserFeedList } from '../apis';

import type { FeedView } from '@lemon/feeds';
import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchInfiniteUserFeedList = (id?: string, params?: Params) =>
    useInfiniteQuery({
        queryKey: userKeys.feeds(id, params),
        queryFn: ({ pageParam = 0 }) => fetchUserFeedList(id, { ...params, page: pageParam }),
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
