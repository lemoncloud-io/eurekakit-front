import { useMemo } from 'react';

import { useSearchFeed } from '@lemon/feeds';
import { useQueryState } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { ErrorWithRetry, Link } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary } from '../../../../utils';
import { Feed, FeedSkeleton } from '../feed';

const SearchResultListContent = () => {
    const [keyword] = useQueryState('keyword');
    const {
        data: searchResults,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useSearchFeed({ keyword });

    const highlightedResult = useMemo(
        () =>
            searchResults?.list.map(feed => {
                try {
                    const regex = new RegExp(keyword, 'gi');
                    const highlighted = feed.text.replace(
                        regex,
                        match => `<span class='bg-accent text-accent-foreground'>${match}</span>`
                    );

                    return { ...feed, text: highlighted };
                } catch {
                    return feed;
                }
            }) ?? [],
        [searchResults, keyword]
    );

    return (
        <InfiniteFetchedList
            items={highlightedResult}
            renderItem={feed => (
                <Link key={feed.id} className="pb-4 pt-2" to={`/feed/${feed.id}`}>
                    <Feed feed={feed} />
                </Link>
            )}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            isLoading={isLoading}
            loadingFallback={
                <List seperator={<Separator />}>
                    {Array.from({ length: Math.floor(window.innerHeight / 120) - 2 }).map(() => (
                        <FeedSkeleton />
                    ))}
                </List>
            }
            emptyFallBack={
                <div className="flex h-48 flex-col items-center justify-center">
                    <span>검색 결과가 없습니다.</span>
                    <span className="text-muted-foreground text-sm">다른 검색어를 입력해 보세요.</span>
                </div>
            }
            className="overflow-x-hidden"
        />
    );
};

export const SearchResultList = withQueryErrorBoundary(SearchResultListContent, ErrorWithRetry.FullHeight);
