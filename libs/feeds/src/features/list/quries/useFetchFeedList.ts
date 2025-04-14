import { useQuery } from '@tanstack/react-query';

import { feedKeys } from '../../../consts';
import { fetchFeedList } from '../apis';

import type { FeedListParams } from '../../../types';

export const useFetchFeedList = (params: FeedListParams) =>
    useQuery({
        queryKey: feedKeys.list(params),
        queryFn: () => fetchFeedList(params),
    });
