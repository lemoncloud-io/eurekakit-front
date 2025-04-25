import { useInfiniteQuery } from '@tanstack/react-query';

import { feedsKeys } from '../../../consts';
import { fetchFeedCommentList } from '../apis';

import type { ListResult } from '@lemon/shared';
import type { Params } from '@lemoncloud/lemon-web-core';
import type { CommentView, UserView } from '@lemoncloud/pets-socials-api';

export const useFetchInfiniteFeedCommentList = (feedId?: string, params?: Params) =>
    useInfiniteQuery({
        queryKey: feedsKeys.comment(feedId, params, true),
        queryFn: ({ pageParam = 0 }) => fetchFeedCommentList(feedId, { ...params, page: pageParam }),
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
            const listResult = data.pages.reduce(
                (acc, cur) => {
                    return { ...acc, list: [...acc.list, ...cur.list] };
                },
                { list: [], total: data.pages[0].total } as ListResult<CommentView>
            );

            const userInfo = data.pages.reduce((acc, cur) => {
                cur.Users.forEach(user => {
                    if (acc.has(user.id)) {
                        return acc;
                    }

                    acc.set(user.id, user);

                    return acc;
                });
                return acc;
            }, new Map<string, UserView>());

            const commentListWithUser = listResult.list.map(feed => ({ ...feed, user$: userInfo.get(feed.userId) }));

            console.log(commentListWithUser);

            return { ...listResult, list: commentListWithUser };
        },
    });
