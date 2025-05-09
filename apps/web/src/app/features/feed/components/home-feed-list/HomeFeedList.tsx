import { useFetchInfiniteFeedList } from '@lemon/feeds';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { INFINITE_FEED_LIST_LIMIT } from '../../consts';
import { NoFeed } from '../no-feed';
import { FeedListBlock } from './FeedListBlock';
import { HomeFeedListSkeleton } from './HomeFeedList.skeleton';
import { ErrorWithRetry } from '../../../../components';
import { InfiniteFetchedList } from '../../../../components/infinite-fetched-list/InfiniteFetchedList';
import { withQueryErrorBoundary } from '../../../../utils';

const HomeFeedListContent = () => {
    const {
        data: feedList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
    } = useFetchInfiniteFeedList({ limit: INFINITE_FEED_LIST_LIMIT });

    return (
        <InfiniteFetchedList
            items={feedList?.list}
            renderItem={feed => <FeedListBlock key={feed.id} feed={feed} />}
            seperator={<Separator />}
            fetchFn={fetchNextPage}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            isLoading={isLoading}
            loadingFallback={<HomeFeedListSkeleton />}
            emptyFallBack={<NoFeed />}
            triggerType="button"
            className="gap-3 py-3"
        />
    );
};

export const HomeFeedList = withQueryErrorBoundary(HomeFeedListContent, ErrorWithRetry);
