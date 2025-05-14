import { useFetchInfiniteViewedFeedList } from '@lemon/feeds';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { ErrorWithRetry, Link } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';
import { Feed, FeedSkeleton } from '../../../feed/components';

const RecentViewedFeedListSkeleton = () => (
    <List seperator={<Separator />}>
        {Array.from({ length: window.innerHeight / 120 - 2 }).map(() => (
            <FeedSkeleton />
        ))}
    </List>
);

export const RecentViewedFeedListEmptyFallback = () => (
    <div className="text-secondary-foreground flex flex-1 flex-col items-center justify-center gap-3 text-sm">
        <span>최근 본 글이 없습니다</span>
    </div>
);

const RecentViewedFeedListContent = () => {
    const { data: viewedFeedList, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchInfiniteViewedFeedList();

    return (
        <InfiniteFetchedList
            items={viewedFeedList?.list}
            renderItem={feed => (
                <Link to={`/feed/${feed.id}`} key={feed.id}>
                    <Feed feed={feed} />
                </Link>
            )}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            emptyFallBack={<RecentViewedFeedListEmptyFallback />}
            className="overflow-x-hidden"
        />
    );
};

export const RecentViewedFeedList = withQueryErrorBoundary(
    withSuspense(RecentViewedFeedListContent, <RecentViewedFeedListSkeleton />),
    errorProps => <ErrorWithRetry {...errorProps} className="h-full" />
);
