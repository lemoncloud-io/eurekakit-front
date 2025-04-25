import { useFetchInfiniteViewedFeedList } from '@lemon/feeds';
import { List } from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';

import { InfiniteList } from '../../../../components';
import { Post } from '../../../post/components';
import { PostSkeleton } from '../../../post/components/post/PostSkeleton';

export const RecentViewedFeedList = () => {
    const {
        data: viewedFeedList,
        hasNextPage,
        isFetching,
        fetchNextPage,
        isLoading,
    } = useFetchInfiniteViewedFeedList();

    const isEmptyList = viewedFeedList?.total === 0;

    if (isLoading) {
        return (
            <List seperator={<Separator />}>
                {Array.from({ length: window.innerHeight / 120 - 2 }).map(() => (
                    <PostSkeleton />
                ))}
            </List>
        );
    }

    if (isEmptyList) {
        return (
            <div className="text-secondary-foreground flex flex-1 flex-col items-center justify-center gap-3 text-sm">
                <span>최근 본 글이 없습니다</span>
            </div>
        );
    }

    return (
        <InfiniteList
            showTrigger={hasNextPage}
            isFetching={isFetching}
            fetchFn={fetchNextPage}
            seperator={<Separator />}
            className="overflow-x-hidden"
        >
            {viewedFeedList?.list.map(feed => <Post post={feed} />)}
        </InfiniteList>
    );
};
