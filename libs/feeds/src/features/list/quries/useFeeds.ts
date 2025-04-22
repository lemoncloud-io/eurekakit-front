import { useQuery } from '@tanstack/react-query';


import { feedKeys } from '../../../consts';
import { fetchFeedList } from '../apis';

import type { PaginationType, Params } from '@lemon/shared';
import type { FeedView } from '@lemoncloud/pets-socials-api';

export const useFeeds = (params: Params) =>
    useQuery<PaginationType<FeedView[]>>({
        queryKey: feedKeys.list(params ?? {}),
        queryFn: async () => {
            const result = await fetchFeedList(params);
            return { ...result, data: result.list || [] } as PaginationType<FeedView[]>;
        },
        refetchOnWindowFocus: false,
    });
