import { useMemo } from 'react';

import { useSearchFeed } from '@lemon/feeds';
import { useQueryState } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { InfiniteList, Link } from '../../../../components';
import { Post } from '../../../post/components';
import { PostSkeleton } from '../../../post/components/post/PostSkeleton';

export const SearchResultList = () => {
    const [keyword] = useQueryState('keyword');
    const {
        data: searchResults,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useSearchFeed({ keyword });

    const isEmptyResult = !!keyword && searchResults?.total === 0;
    const highlightedResult = useMemo(
        () =>
            searchResults?.list.map(post => {
                try {
                    const regex = new RegExp(keyword, 'gi');
                    const highlighted = post.text.replace(
                        regex,
                        match => `<span class='bg-accent text-accent-foreground'>${match}</span>`
                    );

                    return { ...post, text: highlighted };
                } catch {
                    return post;
                }
            }) ?? [],
        [searchResults, keyword]
    );

    if (isLoading) {
        return (
            <List seperator={<Separator />}>
                {Array.from({ length: Math.floor(window.innerHeight / 120) - 2 }).map(() => (
                    <PostSkeleton />
                ))}
            </List>
        );
    }

    if (isEmptyResult) {
        return (
            <div className="flex h-48 flex-col items-center justify-center">
                <span>검색 결과가 없습니다.</span>
                <span className="text-muted-foreground text-sm">다른 검색어를 입력해 보세요.</span>
            </div>
        );
    }

    return (
        <InfiniteList
            isFetching={isFetchingNextPage}
            fetchFn={fetchNextPage}
            showTrigger={hasNextPage}
            seperator={<Separator />}
            className="overflow-x-hidden"
        >
            {highlightedResult.map(post => (
                <Link key={post.id} className="pb-4 pt-2" to={`/post/${post.id}`}>
                    <Post post={post} />
                </Link>
            ))}
        </InfiniteList>
    );
};
