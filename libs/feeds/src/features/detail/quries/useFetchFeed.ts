import { useQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeed } from '../apis';

import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchFeed = (id?: string, params?: Params) =>
    useQuery({
        queryKey: feedsKeys.detail(id, params),
        queryFn: () => fetchFeed(id, params),
        enabled: !!id,
    });
