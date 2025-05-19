import { useQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeed } from '../apis';

import type { FeedView } from '@lemoncloud/pets-socials-api';

export const useFeed = (feedId: string) =>
    useQuery<FeedView>({
        queryKey: feedsKeys.detail(feedId),
        queryFn: () => fetchFeed(feedId),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!feedId,
    });
