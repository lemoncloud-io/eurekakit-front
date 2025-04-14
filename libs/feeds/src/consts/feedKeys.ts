import type { Params } from '@lemoncloud/lemon-web-core';

export const feedKeys = {
    all: ['feeds'] as const,
    lists: () => [...feedKeys.all, 'list'] as const,
    list: (filter?: Params, infinite?: boolean) =>
        [...feedKeys.lists(), ...(infinite ? ['infinite'] : []), filter] as const,
    details: () => [...feedKeys.all, 'detail'] as const,
    detail: (id?: string, filter?: Params) => [...feedKeys.details(), id, filter] as const,
};
