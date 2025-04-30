import type { Params } from '@lemoncloud/lemon-web-core';

export const commentKeys = {
    all: ['comments'],
    lists: (infinite?: boolean) => [...commentKeys.all, 'lists', ...(infinite ? ['infinite'] : [])],
    list: (filter: Params, infinite?: boolean) => [...commentKeys.lists(infinite), { ...filter }],
    details: () => [...commentKeys.all, 'details'],
    detail: (commentId?: string, filter?: Params) => [commentKeys.details(), commentId, { ...filter }],
};
