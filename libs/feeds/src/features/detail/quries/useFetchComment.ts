import { useQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchComment } from '../apis';

import type { Params } from '@lemoncloud/lemon-web-core';

export const useFetchComment = (commentId?: string, params?: Params) =>
    useQuery({
        queryKey: feedsKeys.comment(commentId, params),
        queryFn: () => fetchComment(commentId, params),
        enabled: !!commentId,
    });
