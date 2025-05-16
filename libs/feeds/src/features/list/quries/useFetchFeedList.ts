import { useSuspenseQuery } from '@tanstack/react-query';

import { attachUser$ToListResult } from '@lemon/users';

import { feedsKeys } from '../../../consts';
import { fetchFeedList } from '../apis';

import type { FeedListParam } from '../../../types';

export const useFetchFeedList = (params?: FeedListParam) =>
    useSuspenseQuery({
        queryKey: feedsKeys.list(params),
        queryFn: () => fetchFeedList(params),
        select: data => attachUser$ToListResult(data, data.Users),
    });
