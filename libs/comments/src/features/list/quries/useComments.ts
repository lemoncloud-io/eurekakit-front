import { useQuery } from '@tanstack/react-query';

import { commentKeys } from '../../../consts';
import { fetchFeedCommentList } from '../apis';

import type { CommentListParams } from '../../../types';
import type { PaginationType } from '@lemon/shared';
import type { FeedView } from '@lemoncloud/pets-socials-api';

export const useComments = ({ feedId, params }: { feedId: string; params?: CommentListParams }) =>
    useQuery<PaginationType<FeedView[]>>({
        queryKey: commentKeys.list({ feedId }, true),
        queryFn: async () => {
            const result = await fetchFeedCommentList(feedId, params);
            return { ...result, data: result.list || [] } as PaginationType<FeedView[]>;
        },
        refetchOnWindowFocus: false,
        enabled: !!feedId,
    });
