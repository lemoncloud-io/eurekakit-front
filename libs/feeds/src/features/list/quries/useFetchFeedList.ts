import { useQuery } from '@tanstack/react-query';

import { feedKeys } from '../../../consts';
import { fetchFeedList } from '../apis';

import type { FeedListParam } from '../../../types';

export const useFetchFeedList = (params?: FeedListParam) =>
    useQuery({
        queryKey: feedKeys.list(params),
        queryFn: () => fetchFeedList(params),
    });
