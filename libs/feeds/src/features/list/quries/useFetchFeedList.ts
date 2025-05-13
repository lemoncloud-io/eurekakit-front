import { useSuspenseQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeedList } from '../apis';
import { attachUser$ToListResult } from '../utils';

import type { FeedListParam } from '../../../types';

export const useFetchFeedList = (params?: FeedListParam) =>
    useSuspenseQuery({
        queryKey: feedsKeys.list(params),
        queryFn: () => fetchFeedList(params),
        select: data => attachUser$ToListResult(data, data.Users),
    });
