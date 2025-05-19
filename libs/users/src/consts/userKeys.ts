import type { Params } from '@lemoncloud/lemon-web-core';

export const userKeys = {
    all: ['users'] as const,
    lists: (infinite?: boolean) => [...userKeys.all, 'list', ...(infinite ? ['infinite'] : [])] as const,
    list: (filter?: Params, infinite?: boolean) => [...userKeys.lists(infinite), filter] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id?: string, filter?: Params) => [...userKeys.details(), id, filter] as const,
    profile: () => [...userKeys.all, 'profile'],
};
