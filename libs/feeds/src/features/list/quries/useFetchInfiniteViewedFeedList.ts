import { useInfiniteQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchViewedFeedList } from '../apis';

import type { FeedListParam, FeedView } from '../../../types';
import type { ListResult } from '@lemon/shared';

// TODO : @luke-lemon infinite list를 따로 기능으로 뺴는게 나으려나
export const useFetchInfiniteViewedFeedList = (params?: FeedListParam) =>
    useInfiniteQuery({
        // TODO : @luke-lemon 나중에 스키마로 빼던가 해야할 듯
        queryKey: feedsKeys.list({ ...params, viewed: true, parent: true, activity: true }, true),
        queryFn: ({ pageParam = 0 }) => fetchViewedFeedList({ ...params, page: pageParam }),
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
