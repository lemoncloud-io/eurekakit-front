import type { Params } from '@lemoncloud/lemon-web-core';

export const feedsKeys = {
    all: ['feeds'] as const,
    lists: () => [...feedsKeys.all, 'list'] as const,
    list: (filter?: Params, infinite?: boolean) =>
        [...feedsKeys.lists(), ...(infinite ? ['infinite'] : []), filter] as const,
    details: () => [...feedsKeys.all, 'detail'] as const,
    detail: (id?: string, filter?: Params) => [...feedsKeys.details(), id, filter] as const,
    invalidateList: () => ({
        queryKey: ['feeds', 'list'],
        exact: false,
    }),
};
