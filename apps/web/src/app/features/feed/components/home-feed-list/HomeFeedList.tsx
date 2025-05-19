import { useFetchInfiniteFeedList } from '@lemon/feeds';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { INFINITE_FEED_LIST_LIMIT } from '../../consts';
import { NoFeed } from '../no-feed';
import { FeedListBlock } from './FeedListBlock';
import { ErrorWithRetry } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary, withSuspense } from '../../../../utils';

const HomeFeedListSkeleton = () => {
    return (
        <List seperator={<Separator />} className="gap-3 py-3">
            {Array.from({ length: 5 }).map((_, idx) => (
                <div className="flex gap-2" key={idx}>
                    <div className="flex w-full flex-col gap-2">
                        <div className="bg-secondary h-1/2 w-full animate-pulse rounded-lg" />
                        <div className="bg-secondary h-5 w-1/2 animate-pulse rounded-lg" />
                        <div className="bg-secondary h-5 w-1/2 animate-pulse rounded-lg" />
                    </div>
                    <div className="bg-secondary aspect-square h-24 animate-pulse rounded-lg" key={idx} />
                </div>
            ))}
        </List>
    );
};

const HomeFeedListContent = () => {
    const {
        data: feedList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useFetchInfiniteFeedList({ limit: INFINITE_FEED_LIST_LIMIT });

    return (
        <InfiniteFetchedList
            items={feedList?.list}
            renderItem={feed => <FeedListBlock key={feed.id} feed={feed} />}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            emptyFallBack={<NoFeed />}
            triggerType="button"
            className="gap-3 py-3"
        />
    );
};

export const HomeFeedList = withQueryErrorBoundary(
    withSuspense(HomeFeedListContent, <HomeFeedListSkeleton />),
    ErrorWithRetry
);
