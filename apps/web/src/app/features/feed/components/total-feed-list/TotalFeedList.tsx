import { useFetchInfiniteFeedList } from '@lemon/feeds';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { InfiniteList } from '../../../../components';
import { Post } from '../../../post/components';
import { PostSkeleton } from '../../../post/components/post/PostSkeleton';
import { NoPostGoWrite } from '../no-feed';

export const TotalFeedList = () => {
    const { data: feedList, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchInfiniteFeedList();

    const isEmptyList = feedList?.list.length === 0;

    if (isLoading) {
        return (
            <List seperator={<Separator />}>
                {Array.from({ length: Math.floor(window.innerHeight / 120) - 2 }).map(() => (
                    <PostSkeleton />
                ))}
            </List>
        );
    }

    if (isEmptyList) {
        return <NoPostGoWrite />;
    }

    return (
        <InfiniteList
            seperator={<Separator />}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            fetchFn={fetchNextPage}
            className="overflow-x-hidden"
        >
            {feedList?.list.map(feed => <Post key={feed.id} post={feed} />)}
        </InfiniteList>
    );
};
