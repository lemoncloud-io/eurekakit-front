import { useQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeedList } from '../apis';

import type { FeedListParam } from '../../../types';

export const useFetchFeedList = (params?: FeedListParam) =>
    useQuery({
        queryKey: feedsKeys.list(params),
        queryFn: () => fetchFeedList(params),
    });
