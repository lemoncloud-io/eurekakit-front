import { useSuspenseQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeed } from '../apis';
import { viewFeed } from '../apis/viewFeed';

import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchFeed = (id?: string, params?: Params) =>
    useSuspenseQuery({
        queryKey: feedsKeys.detail(id, params),
        queryFn: () => {
            viewFeed(id);
            return fetchFeed(id, params);
        },
    });
