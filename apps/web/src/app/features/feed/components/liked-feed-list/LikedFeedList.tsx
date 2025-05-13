import { useFetchInfiniteLikedFeedList } from '@lemon/feeds';
import { useQueryState } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { ErrorWithRetry, Link } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';
import { Feed, FeedSkeleton } from '../feed';
import { NoLikedFeed } from '../no-feed';

import type { FeedType } from '@lemon/feeds';

const LikedFeedListSkeleton = () => (
    <List seperator={<Separator />}>
        {Array.from({ length: Math.floor(window.innerHeight / 120) - 2 }).map(() => (
            <FeedSkeleton />
        ))}
    </List>
);

const LikedFeedListContent = () => {
    const [feedType] = useQueryState<FeedType>('type', { defaultValue: 'all' });

    const {
        data: likedFeedList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useFetchInfiniteLikedFeedList({ type: feedType });

    return (
        <InfiniteFetchedList
            items={likedFeedList?.list}
            renderItem={feed => (
                <Link key={feed.id} className="pb-4 pt-2" to={`/feed/${feed.id}`}>
                    <Feed feed={feed} />
                </Link>
            )}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            emptyFallBack={<NoLikedFeed />}
            className="overflow-x-hidden"
        />
    );
};

export const LikedFeedList = withQueryErrorBoundary(
    withSuspense(LikedFeedListContent, <LikedFeedListSkeleton />),
    errorProps => <ErrorWithRetry {...errorProps} className="h-full" />
);
