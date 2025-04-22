import { useQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeedCommentList } from '../apis';

import type { PaginationType, Params } from '@lemon/shared';
import type { FeedView } from '@lemoncloud/pets-socials-api';

export const useComments = ({ feedId, params }: { feedId: string; params?: Params }) =>
    useQuery<PaginationType<FeedView[]>>({
        queryKey: feedsKeys.comment(feedId, params ?? {}, true),
        queryFn: async () => {
            const result = await fetchFeedCommentList(feedId, params);
            return { ...result, data: result.list || [] } as PaginationType<FeedView[]>;
        },
        refetchOnWindowFocus: false,
        enabled: !!feedId,
    });
