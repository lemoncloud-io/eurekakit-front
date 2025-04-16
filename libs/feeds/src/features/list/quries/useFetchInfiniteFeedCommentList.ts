import { useInfiniteQuery } from '@tanstack/react-query';

import { feedKeys } from '../../../consts';
import { fetchFeedCommentList } from '../apis';

import type { FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchInfiniteFeedCommentList = (feedId?: string, params?: Params) =>
    useInfiniteQuery({
        queryKey: feedKeys.comment(feedId, params),
        queryFn: ({ pageParam = 0 }) => fetchFeedCommentList(feedId, { ...params, page: pageParam }),
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
