import { useSuspenseQuery } from '@tanstack/react-query';

import { commentKeys } from '../../../consts';
import { fetchComment } from '../apis';

import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchComment = (commentId?: string, params?: Params) =>
    useSuspenseQuery({
        queryKey: commentKeys.detail(commentId, params),
        queryFn: () => fetchComment(commentId, params),
    });
