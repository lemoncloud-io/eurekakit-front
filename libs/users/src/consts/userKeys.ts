import type { Params } from '@lemoncloud/lemon-web-core';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filter?: Params, infinite?: boolean) =>
        [...userKeys.lists(), ...(infinite ? ['infinite'] : []), filter] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id?: string, filter?: Params) => [...userKeys.details(), id, filter] as const,
    feeds: (id?: string, filters?: Params) => [...userKeys.details(), id, 'feeds', filters],
};
