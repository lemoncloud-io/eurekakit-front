import { useInfiniteQuery } from '@tanstack/react-query';

import { userKeys } from '../../../consts/userKeys';
import { fetchUserCommentList } from '../apis/fetchUserCommentList';

import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';
import type { CommentView } from '@lemoncloud/pets-socials-api';

export const useFetchInfiniteUserCommentList = (id?: string, params?: Params) =>
    useInfiniteQuery({
        //TODO : @luke-lemon 추후 스키마로 빼던지 해야할 듯.
        queryKey: userKeys.feeds(id, { parent: false, ...params }),
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
