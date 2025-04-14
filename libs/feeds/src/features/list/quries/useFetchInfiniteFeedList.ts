import { useInfiniteQuery } from '@tanstack/react-query';

import { feedKeys } from '../../../consts';
import { fetchFeedList } from '../apis';

import type { FeedListParams } from '../../../types';
import type { ListResult } from '@lemoncloud/codes-backend-api/dist/cores/types';
import type { FeedView } from '@lemoncloud/pets-socials-api';

export const useFetchInfiniteFeedList = (params?: FeedListParams) =>
    useInfiniteQuery({
        queryKey: feedKeys.list(params, true),
        queryFn: ({ pageParam = 0 }) => fetchFeedList({ ...params, page: pageParam }),
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
                { list: [], total: data.pages[0].total } satisfies ListResult<FeedView>
            );
        },
    });
