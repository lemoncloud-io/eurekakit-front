import { useFetchInfiniteLikedFeedList } from '@lemon/feeds';
import { useQueryState } from '@lemon/shared';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { InfiniteList, Link } from '../../../../components';
import { NoLikedFeed } from '../no-feed';
import { Post } from '../post';
import { PostSkeleton } from '../post/PostSkeleton';

import type { FeedType } from '@lemon/feeds';

export const LikedFeedList = () => {
    const [feedType] = useQueryState<FeedType>('type', { defaultValue: 'all' });

    const {
        data: likedFeedList,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useFetchInfiniteLikedFeedList({ type: feedType });

    const isEmptyList = likedFeedList?.list.length === 0;

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
        return <NoLikedFeed />;
    }

    return (
        <InfiniteList
            seperator={<Separator />}
            isFetching={isFetchingNextPage}
            showTrigger={hasNextPage}
            fetchFn={fetchNextPage}
            className="overflow-x-hidden"
        >
            {likedFeedList?.list.map(feed => (
                <Link key={feed.id} className="pb-4 pt-2" to={`/feed/${feed.id}`}>
                    <Post post={feed} />
                </Link>
            ))}
        </InfiniteList>
    );
};
