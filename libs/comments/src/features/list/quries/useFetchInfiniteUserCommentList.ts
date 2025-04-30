import { useInfiniteQuery } from '@tanstack/react-query';

import { commentKeys } from '../../../consts';
import { fetchUserCommentList } from '../apis';

import type { CommentListParams, CommentView } from '../../../types';
import type { ListResult } from '@lemon/shared';

export const useFetchInfiniteUserCommentList = (id?: string, params?: CommentListParams) =>
    useInfiniteQuery({
        //TODO : @luke-lemon 추후 스키마로 빼던지 해야할 듯.
        queryKey: commentKeys.list({ parent: false, id, ...params }),
        queryFn: ({ pageParam = 0 }) => fetchUserCommentList(id, { ...params, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: lastPage => {
            const { page, total, limit } = lastPage;

            if (page == null || total == null || limit == null) {
                return undefined;
            }

            const maxPages = Math.ceil(total / limit);

            return page + 1 < maxPages ? page + 1 : undefined;
        },
        select: data => {
            return data.pages.reduce(
                (acc, cur) => {
                    return { ...acc, list: [...acc.list, ...cur.list] };
                },
                { list: [], total: data.pages[0].total } as ListResult<CommentView>
            );
        },
    });
